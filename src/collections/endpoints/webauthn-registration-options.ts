import type { Endpoint } from 'payload'
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server'
import { generateRegistrationOptions } from '@simplewebauthn/server'
import {
  getRpConfig,
  signChallengeCookie,
  buildChallengeCookieHeader,
  jsonWithConfigErrorHandling,
} from '@/utils/webauthn-config'

type PasskeyRow = {
  credentialID: string
  transports?: AuthenticatorTransportFuture[] | null
}

export const webauthnRegistrationOptions: Endpoint = {
  path: '/webauthn/registration/options',
  method: 'post',
  handler: async (req) =>
    jsonWithConfigErrorHandling(async () => {
      if (!req.user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { rpID, rpName } = getRpConfig()
      const existingPasskeys = ((req.user as { passkeys?: PasskeyRow[] }).passkeys ?? []) as PasskeyRow[]

      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userName:
          (req.user as { username?: string; email?: string }).username ||
          req.user.email ||
          String(req.user.id),
        userID: new TextEncoder().encode(String(req.user.id)),
        attestationType: 'none',
        excludeCredentials: existingPasskeys.map((passkey) => ({
          id: passkey.credentialID,
          transports: passkey.transports ?? undefined,
        })),
        authenticatorSelection: {
          residentKey: 'required',
          userVerification: 'preferred',
        },
      })

      const cookieValue = signChallengeCookie({ challenge: options.challenge, userId: String(req.user.id) })

      return Response.json(options, {
        headers: { 'Set-Cookie': buildChallengeCookieHeader(cookieValue) },
      })
    }),
}
