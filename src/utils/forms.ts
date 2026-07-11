import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import type { FormDocument } from '@/types/forms'

/**
 * Rough reading-time estimate for a survey: ~3 fields per minute, floored
 * at 1 minute so an empty/single-field form doesn't display "~0 min".
 */
export function estimateSurveyMinutes(fieldCount: number): number {
  return Math.max(1, Math.ceil(fieldCount / 3))
}

/**
 * Fetch all available surveys via the Payload local API.
 * Server-side only — avoids an HTTP round-trip to our own /api routes.
 */
export const getAllForms = unstable_cache(
  async (): Promise<FormDocument[]> => {
    try {
      const payload = await getPayload({ config })
      const { docs } = await payload.find({
        collection: 'surveys',
        limit: 100,
        depth: 1,
      })
      return docs as unknown as FormDocument[]
    } catch (error) {
      console.error('Error fetching surveys:', error)
      return []
    }
  },
  ['all-surveys'],
  { revalidate: 60, tags: ['surveys'] }
)
