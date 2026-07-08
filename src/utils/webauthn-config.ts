import crypto from 'crypto'

type ChallengeCookiePayload = {
  challenge: string
  userId: string | null
  expiresAt: number
}

const CHALLENGE_COOKIE_NAME = 'payload-webauthn-challenge'
const CHALLENGE_TTL_MS = 5 * 60 * 1000

export class WebAuthnConfigError extends Error {}

export function getRpConfig(): { rpID: string; rpName: string; origins: string[] } {
  const baseUrlRaw = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

  let baseUrl: URL
  try {
    baseUrl = new URL(baseUrlRaw)
  } catch {
    throw new WebAuthnConfigError(`NEXT_PUBLIC_PAYLOAD_URL is not a valid URL: "${baseUrlRaw}"`)
  }

  const rpID = process.env.WEBAUTHN_RP_ID || baseUrl.hostname
  const rpName = process.env.WEBAUTHN_RP_NAME || 'miiyuh CMS'
  const origins = (process.env.WEBAUTHN_ORIGIN || baseUrlRaw)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  if (!rpID) {
    throw new WebAuthnConfigError('Unable to determine WebAuthn RP ID. Set WEBAUTHN_RP_ID explicitly.')
  }
  if (origins.length === 0) {
    throw new WebAuthnConfigError('Unable to determine WebAuthn allowed origin(s). Set WEBAUTHN_ORIGIN explicitly.')
  }
  for (const origin of origins) {
    try {
      const originHost = new URL(origin).hostname
      if (originHost !== rpID && !originHost.endsWith(`.${rpID}`)) {
        throw new WebAuthnConfigError(
          `WEBAUTHN_ORIGIN "${origin}" does not match WebAuthn RP ID "${rpID}". The origin's hostname must equal or be a subdomain of the RP ID.`,
        )
      }
    } catch (err) {
      if (err instanceof WebAuthnConfigError) throw err
      throw new WebAuthnConfigError(`WEBAUTHN_ORIGIN contains an invalid URL: "${origin}"`)
    }
  }

  return { rpID, rpName, origins }
}

export function jsonWithConfigErrorHandling(handler: () => Promise<Response>): Promise<Response> {
  return handler().catch((err) => {
    if (err instanceof WebAuthnConfigError) {
      return Response.json(
        { error: 'not_configured', message: 'Passkeys are not configured on this server.' },
        { status: 500 },
      )
    }
    throw err
  })
}

function getHmacSecret(): string {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) {
    throw new Error('Missing required environment variable: PAYLOAD_SECRET')
  }
  return secret
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getHmacSecret()).update(value).digest('base64url')
}

export function signChallengeCookie(payload: Omit<ChallengeCookiePayload, 'expiresAt'>): string {
  const body: ChallengeCookiePayload = {
    ...payload,
    expiresAt: Date.now() + CHALLENGE_TTL_MS,
  }
  const encoded = Buffer.from(JSON.stringify(body)).toString('base64url')
  const signature = sign(encoded)
  return `${encoded}.${signature}`
}

export function verifyChallengeCookie(cookieValue: string | undefined): ChallengeCookiePayload | null {
  if (!cookieValue) return null

  const [encoded, signature] = cookieValue.split('.')
  if (!encoded || !signature) return null

  const expectedSignature = sign(encoded)
  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as ChallengeCookiePayload
    if (typeof payload.expiresAt !== 'number' || payload.expiresAt < Date.now()) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

function isSecureContext(): boolean {
  if (process.env.NODE_ENV === 'production') return true
  try {
    return getRpConfig().origins.every((origin) => origin.startsWith('https://'))
  } catch {
    return false
  }
}

export function buildChallengeCookieHeader(value: string | null): string {
  const secureAttr = isSecureContext() ? '; Secure' : ''
  if (value === null) {
    return `${CHALLENGE_COOKIE_NAME}=; Path=/api/users/webauthn; HttpOnly; SameSite=Lax; Max-Age=0${secureAttr}`
  }
  return `${CHALLENGE_COOKIE_NAME}=${value}; Path=/api/users/webauthn; HttpOnly; SameSite=Lax; Max-Age=${CHALLENGE_TTL_MS / 1000}${secureAttr}`
}

export function readChallengeCookie(req: { headers: Pick<Headers, 'get'> }): string | undefined {
  const cookieHeader = req.headers.get('cookie')
  if (!cookieHeader) return undefined
  const match = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CHALLENGE_COOKIE_NAME}=`))
  return match?.slice(CHALLENGE_COOKIE_NAME.length + 1)
}
