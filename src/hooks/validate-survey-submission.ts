import { APIError } from 'payload'
import type { CollectionBeforeValidateHook, PayloadRequest } from 'payload'

/**
 * Abuse protection for public survey submissions.
 *
 * The survey-responses collection allows unauthenticated creation, so this
 * hook validates every incoming submission against the referenced form:
 *   1. every submitted field name must exist on the form (no junk payloads)
 *   2. submission size is capped (array length + per-value string length)
 *   3. honeypot: a filled "_website" field means a bot — reject
 *   4. best-effort per-IP rate limit (in-memory, per warm serverless instance)
 */

const MAX_VALUE_LENGTH = 5000
const HONEYPOT_FIELD = '_website'

// Fixed-window rate limit. On Vercel this Map lives per warm lambda instance,
// so it is best-effort — but it still stops naive single-source floods.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_PER_WINDOW = 5
const MAX_TRACKED_IPS = 10_000

const submissionTimestamps = new Map<string, number[]>()

const getClientIp = (req: PayloadRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()

  // Opportunistic cleanup so the map cannot grow unbounded
  if (submissionTimestamps.size > MAX_TRACKED_IPS) {
    for (const [key, stamps] of submissionTimestamps) {
      if (stamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        submissionTimestamps.delete(key)
      }
    }
  }

  const recent = (submissionTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )

  if (recent.length >= RATE_LIMIT_MAX_PER_WINDOW) {
    submissionTimestamps.set(ip, recent)
    return true
  }

  recent.push(now)
  submissionTimestamps.set(ip, recent)
  return false
}

type SubmissionEntry = { field?: unknown; value?: unknown }

export const validateSurveySubmission: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') return data

  // Trusted editors working in the admin panel are exempt
  if (req.user) return data

  if (isRateLimited(getClientIp(req))) {
    throw new APIError('Too many submissions. Please try again in a minute.', 429)
  }

  const formId = typeof data?.form === 'object' ? data?.form?.id : data?.form
  if (!formId) {
    throw new APIError('Invalid submission.', 400)
  }

  const rawSubmission = data?.submissionData
  if (!Array.isArray(rawSubmission) || rawSubmission.length === 0) {
    throw new APIError('Invalid submission.', 400)
  }

  let form
  try {
    form = await req.payload.findByID({
      collection: 'surveys',
      id: formId,
      depth: 0,
    })
  } catch {
    throw new APIError('Invalid submission.', 400)
  }

  const allowedFieldNames = new Set(
    (form?.fields ?? [])
      .map((field: any) => ('name' in field ? field.name : undefined))
      .filter((name: any): name is string => typeof name === 'string' && name.length > 0)
  )

  const seenFieldNames = new Set<string>()
  const cleanedSubmission: Array<{ field: string; value: string }> = []

  for (const entry of rawSubmission as SubmissionEntry[]) {
    const fieldName = entry?.field
    const value = entry?.value

    if (typeof fieldName !== 'string' || typeof value !== 'string') {
      throw new APIError('Invalid submission.', 400)
    }

    // Honeypot: hidden field humans never fill — drop empty, reject filled
    if (fieldName === HONEYPOT_FIELD) {
      if (value.trim().length > 0) {
        throw new APIError('Invalid submission.', 400)
      }
      continue
    }

    if (!allowedFieldNames.has(fieldName)) {
      throw new APIError('Invalid submission.', 400)
    }

    if (seenFieldNames.has(fieldName)) {
      throw new APIError('Invalid submission.', 400)
    }
    seenFieldNames.add(fieldName)

    if (value.length > MAX_VALUE_LENGTH) {
      throw new APIError(
        `Field "${fieldName}" exceeds the maximum length of ${MAX_VALUE_LENGTH} characters.`,
        400
      )
    }

    cleanedSubmission.push({ field: fieldName, value })
  }

  if (cleanedSubmission.length === 0) {
    throw new APIError('Invalid submission.', 400)
  }

  return {
    ...data,
    submissionData: cleanedSubmission,
  }
}
