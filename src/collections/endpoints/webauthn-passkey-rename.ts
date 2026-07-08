import type { Endpoint } from 'payload'

type PasskeyRow = {
  credentialID: string
  label?: string
}

export const webauthnPasskeyRename: Endpoint = {
  path: '/webauthn/passkeys/:credentialID',
  method: 'patch',
  handler: async (req) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const credentialID = req.routeParams?.credentialID
    if (typeof credentialID !== 'string' || !credentialID) {
      return Response.json({ error: 'Missing credential ID' }, { status: 400 })
    }

    const body = (await req.json?.()) as { label?: string } | undefined
    const label = body?.label?.trim().slice(0, 100) || undefined

    const currentUser = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
      depth: 0,
      overrideAccess: true,
    })

    const passkeys = ((currentUser as { passkeys?: PasskeyRow[] }).passkeys ?? []) as PasskeyRow[]
    const target = passkeys.find((passkey) => passkey.credentialID === credentialID)
    if (!target) {
      return Response.json({ error: 'Passkey not found' }, { status: 404 })
    }

    target.label = label

    await req.payload.update({
      collection: 'users',
      id: req.user.id,
      data: { passkeys },
      overrideAccess: true,
    })

    return Response.json({ success: true })
  },
}
