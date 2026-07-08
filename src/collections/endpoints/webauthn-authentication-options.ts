import type { Endpoint } from 'payload'
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server'
import { generateAuthenticationOptions } from '@simplewebauthn/server'
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

export const webauthnAuthenticationOptions: Endpoint = {
  path: '/webauthn/authentication/options',
  method: 'post',
  handler: async (req) =>
    jsonWithConfigErrorHandling(async () => {
      const body = (await req.json?.()) as { username?: string } | undefined
      const username = body?.username?.trim().toLowerCase()

      const { rpID } = getRpConfig()

      let allowCredentials: { id: string; transports?: AuthenticatorTransportFuture[] }[] = []
      let userId: string | null = null

      if (username) {
        const result = await req.payload.find({
          collection: 'users',
          where: { or: [{ username: { equals: username } }, { email: { equals: username } }] },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        })

        const user = result.docs[0] as { id: string | number; passkeys?: PasskeyRow[] } | undefined
        if (user) {
          userId = String(user.id)
          allowCredentials = (user.passkeys ?? []).map((passkey) => ({
            id: passkey.credentialID,
            transports: passkey.transports ?? undefined,
          }))
        }
      }

      const options = await generateAuthenticationOptions({
        rpID,
        allowCredentials,
        userVerification: 'preferred',
      })

      const cookieValue = signChallengeCookie({ challenge: options.challenge, userId })

      return Response.json(options, {
        headers: { 'Set-Cookie': buildChallengeCookieHeader(cookieValue) },
      })
    }),
}
