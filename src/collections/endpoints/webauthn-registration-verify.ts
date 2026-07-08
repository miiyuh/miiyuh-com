import type { Endpoint } from 'payload'
import type { RegistrationResponseJSON } from '@simplewebauthn/server'
import { verifyRegistrationResponse } from '@simplewebauthn/server'
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
  deviceType?: string
  backedUp: boolean
  transports?: string[]
  label?: string
  createdAt: string
}

export const webauthnRegistrationVerify: Endpoint = {
  path: '/webauthn/registration/verify',
  method: 'post',
  handler: async (req) =>
    jsonWithConfigErrorHandling(async () => {
      if (!req.user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const challengeState = verifyChallengeCookie(readChallengeCookie(req))
      if (!challengeState || challengeState.userId !== String(req.user.id)) {
        return Response.json({ error: 'Registration challenge expired or invalid' }, { status: 400 })
      }

      const body = (await req.json?.()) as { response?: RegistrationResponseJSON; label?: string } | undefined
      if (!body?.response) {
        return Response.json({ error: 'Missing registration response' }, { status: 400 })
      }

      const { rpID, origins } = getRpConfig()

      let verification
      try {
        verification = await verifyRegistrationResponse({
          response: body.response,
          expectedChallenge: challengeState.challenge,
          expectedOrigin: origins,
          expectedRPID: rpID,
        })
      } catch {
        return Response.json({ error: 'Passkey registration failed' }, { status: 400 })
      }

      if (!verification.verified || !verification.registrationInfo) {
        return Response.json({ error: 'Passkey registration failed' }, { status: 400 })
      }

      const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo

      const existingOwner = await req.payload.find({
        collection: 'users',
        where: { 'passkeys.credentialID': { equals: credential.id } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      if (existingOwner.totalDocs > 0) {
        return Response.json({ error: 'This passkey is already registered' }, { status: 409 })
      }

      const existingPasskeys = ((req.user as { passkeys?: PasskeyRow[] }).passkeys ?? []) as PasskeyRow[]
      const newPasskey: PasskeyRow = {
        credentialID: credential.id,
        publicKey: isoBase64URL.fromBuffer(credential.publicKey),
        counter: credential.counter,
        deviceType: credentialDeviceType,
        backedUp: credentialBackedUp,
        transports: credential.transports,
        label: body.label || undefined,
        createdAt: new Date().toISOString(),
      }

      await req.payload.update({
        collection: 'users',
        id: req.user.id,
        data: { passkeys: [...existingPasskeys, newPasskey] },
        overrideAccess: true,
      })

      return Response.json(
        { verified: true },
        { headers: { 'Set-Cookie': buildChallengeCookieHeader(null) } },
      )
    }),
}
