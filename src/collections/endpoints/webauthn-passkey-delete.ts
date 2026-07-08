import type { Endpoint } from 'payload'

type PasskeyRow = {
  credentialID: string
}

export const webauthnPasskeyDelete: Endpoint = {
  path: '/webauthn/passkeys/:credentialID',
  method: 'delete',
  handler: async (req) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const credentialID = req.routeParams?.credentialID
    if (typeof credentialID !== 'string' || !credentialID) {
      return Response.json({ error: 'Missing credential ID' }, { status: 400 })
    }

    const existingPasskeys = ((req.user as { passkeys?: PasskeyRow[] }).passkeys ?? []) as PasskeyRow[]
    const filtered = existingPasskeys.filter((passkey) => passkey.credentialID !== credentialID)

    if (filtered.length === existingPasskeys.length) {
      return Response.json({ error: 'Passkey not found' }, { status: 404 })
    }

    await req.payload.update({
      collection: 'users',
      id: req.user.id,
      data: { passkeys: filtered },
      overrideAccess: true,
    })

    return Response.json({ success: true })
  },
}
