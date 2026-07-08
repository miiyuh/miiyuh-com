import type { Endpoint } from 'payload'
import {
  checkLoginPermission,
  generatePayloadCookie,
  getFieldsToSign,
  incrementLoginAttempts,
  jwtSign,
  resetLoginAttempts,
} from 'payload'
import { addSessionToUser } from 'payload/shared'
import type { AuthenticationResponseJSON, WebAuthnCredential } from '@simplewebauthn/server'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { isoBase64URL } from '@simplewebauthn/server/helpers'
import {
  getRpConfig,
  readChallengeCookie,
  verifyChallengeCookie,
  buildChallengeCookieHeader,
  jsonWithConfigErrorHandling,
} from '@/utils/webauthn-config'

type PasskeyRow = {
  credentialID: string
  publicKey: string
  counter: number
  transports?: string[]
}

const GENERIC_ERROR = { error: 'Passkey sign-in failed' }
const LOCKED_ERROR = { error: 'Too many failed attempts. Please try again later or use your password.' }

export const webauthnAuthenticationVerify: Endpoint = {
  path: '/webauthn/authentication/verify',
  method: 'post',
  handler: async (req) =>
    jsonWithConfigErrorHandling(async () => {
      const challengeState = verifyChallengeCookie(readChallengeCookie(req))
      if (!challengeState?.userId) {
        return Response.json(GENERIC_ERROR, { status: 400 })
      }

      const body = (await req.json?.()) as { response?: AuthenticationResponseJSON } | undefined
      if (!body?.response) {
        return Response.json(GENERIC_ERROR, { status: 400 })
      }

      const collectionConfig = req.payload.collections['users'].config

      const userDoc = await req.payload.findByID({
        collection: 'users',
        id: challengeState.userId,
        depth: 0,
        overrideAccess: true,
        showHiddenFields: true,
      })

      try {
        checkLoginPermission({ loggingInWithUsername: true, req, user: userDoc })
      } catch {
        return Response.json(LOCKED_ERROR, { status: 423 })
      }

      const passkeys = ((userDoc as { passkeys?: PasskeyRow[] }).passkeys ?? []) as PasskeyRow[]
      const matchingPasskey = passkeys.find((passkey) => passkey.credentialID === body.response!.id)
      if (!matchingPasskey) {
        await incrementLoginAttempts({ collection: collectionConfig, payload: req.payload, user: userDoc })
        return Response.json(GENERIC_ERROR, { status: 400 })
      }

      const { rpID, origins } = getRpConfig()
      const credential: WebAuthnCredential = {
        id: matchingPasskey.credentialID,
        publicKey: isoBase64URL.toBuffer(matchingPasskey.publicKey),
        counter: matchingPasskey.counter,
      }

      let verification
      try {
        verification = await verifyAuthenticationResponse({
          response: body.response,
          expectedChallenge: challengeState.challenge,
          expectedOrigin: origins,
          expectedRPID: rpID,
          credential,
        })
      } catch {
        await incrementLoginAttempts({ collection: collectionConfig, payload: req.payload, user: userDoc })
        return Response.json(GENERIC_ERROR, { status: 400 })
      }

      if (!verification.verified) {
        await incrementLoginAttempts({ collection: collectionConfig, payload: req.payload, user: userDoc })
        return Response.json(GENERIC_ERROR, { status: 400 })
      }

      await resetLoginAttempts({
        collection: collectionConfig,
        doc: userDoc as unknown as Record<string, unknown> & { id: string },
        payload: req.payload,
        req,
      })

      matchingPasskey.counter = verification.authenticationInfo.newCounter
      await req.payload.update({
        collection: 'users',
        id: challengeState.userId,
        data: { passkeys },
        overrideAccess: true,
      })

      const user = { ...userDoc, collection: 'users' } as typeof userDoc & { collection: string }

      const session = await addSessionToUser({ collectionConfig, payload: req.payload, req, user })

      const fieldsToSign = getFieldsToSign({
        collectionConfig,
        email: (user as { email: string }).email,
        sid: session.sid,
        user,
      })

      const { token } = await jwtSign({
        fieldsToSign,
        secret: req.payload.secret,
        tokenExpiration: collectionConfig.auth.tokenExpiration,
      })

      req.user = user

      const cookie = generatePayloadCookie({
        collectionAuthConfig: collectionConfig.auth,
        cookiePrefix: req.payload.config.cookiePrefix,
        token,
      })

      const headers = new Headers()
      headers.append('Set-Cookie', cookie)
      headers.append('Set-Cookie', buildChallengeCookieHeader(null))

      return Response.json({ verified: true, user: { id: user.id } }, { headers })
    }),
}
