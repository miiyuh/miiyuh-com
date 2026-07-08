'use client'

import { useCallback, useEffect, useState } from 'react'
import { startRegistration } from '@simplewebauthn/browser'
import { useAuth, useDocumentInfo, Button } from '@payloadcms/ui'
import { Key, Trash } from '@phosphor-icons/react'

type PasskeyRow = {
  credentialID: string
  label?: string
  deviceType?: string
  createdAt?: string
}

async function parseErrorBody(res: Response): Promise<{ error?: string; message?: string } | null> {
  return res.json().catch(() => null)
}

export default function RegisterPasskeyButton() {
  const { user } = useAuth()
  const { id: docId } = useDocumentInfo()
  const [passkeys, setPasskeys] = useState<PasskeyRow[] | null>(null)
  const [registerStatus, setRegisterStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const isOwnAccount = user && String(user.id) === String(docId)

  const fetchPasskeys = useCallback(async (): Promise<PasskeyRow[] | null> => {
    if (!docId) return null
    const res = await fetch(`/api/users/${docId}?depth=0`, { credentials: 'include' })
    if (!res.ok) return null
    const doc = await res.json()
    return (doc.passkeys ?? []) as PasskeyRow[]
  }, [docId])

  const refetch = useCallback(async () => {
    const result = await fetchPasskeys()
    if (result) setPasskeys(result)
  }, [fetchPasskeys])

  useEffect(() => {
    let cancelled = false
    fetchPasskeys().then((result) => {
      if (!cancelled && result) setPasskeys(result)
    })
    return () => {
      cancelled = true
    }
  }, [fetchPasskeys])

  const handleRegister = async () => {
    setRegisterStatus('pending')
    setError('')

    try {
      const optionsRes = await fetch('/api/users/webauthn/registration/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (!optionsRes.ok) {
        const body = await parseErrorBody(optionsRes)
        throw new Error(body?.error === 'not_configured' ? 'not_configured' : 'failed')
      }
      const options = await optionsRes.json()

      const attestation = await startRegistration({ optionsJSON: options })

      const verifyRes = await fetch('/api/users/webauthn/registration/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ response: attestation }),
      })
      if (!verifyRes.ok) {
        const body = await parseErrorBody(verifyRes)
        throw new Error(body?.error === 'not_configured' ? 'not_configured' : 'failed')
      }

      setRegisterStatus('idle')
      await refetch()
    } catch (err) {
      setRegisterStatus('error')
      setError(
        err instanceof Error && err.message === 'not_configured'
          ? 'Passkeys are not configured on this server. Contact an administrator.'
          : 'Passkey registration failed. Please try again.',
      )
    }
  }

  const handleDelete = async (credentialID: string) => {
    setDeletingId(credentialID)
    setError('')

    try {
      const res = await fetch(`/api/users/webauthn/passkeys/${encodeURIComponent(credentialID)}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('failed')
      await refetch()
    } catch {
      setError('Could not remove this passkey. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!isOwnAccount) {
    return (
      <div className="field-type array">
        <label className="field-label">Passkeys</label>
        <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--theme-elevation-400)' }}>
          Only the account owner can manage passkeys.
        </p>
      </div>
    )
  }

  return (
    <div className="field-type array">
      <label className="field-label">Passkeys</label>
      <p
        style={{
          fontSize: 'var(--font-size-small)',
          color: 'var(--theme-elevation-400)',
          marginTop: 0,
          marginBottom: 'calc(var(--base) / 2)',
        }}
      >
        WebAuthn credentials for passwordless / hardware-key sign-in.
      </p>

      {passkeys === null ? (
        <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--theme-elevation-400)' }}>Loading…</p>
      ) : passkeys.length === 0 ? (
        <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--theme-elevation-400)' }}>
          No passkeys registered yet.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 'var(--base)' }}>
          {passkeys.map((passkey) => (
            <li
              key={passkey.credentialID}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--base)',
                padding: 'calc(var(--base) / 2)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m)',
                marginBottom: 'calc(var(--base) / 4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(var(--base) / 2)' }}>
                <Key size={18} />
                <div>
                  <div>{passkey.label || passkey.deviceType || 'Passkey'}</div>
                  {passkey.createdAt && (
                    <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--theme-elevation-400)' }}>
                      Added {new Date(passkey.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <Button
                buttonStyle="icon-label"
                size="small"
                type="button"
                disabled={deletingId === passkey.credentialID}
                onClick={() => handleDelete(passkey.credentialID)}
                icon={<Trash size={16} />}
                aria-label="Remove passkey"
              />
            </li>
          ))}
        </ul>
      )}

      <Button
        buttonStyle="secondary"
        size="small"
        type="button"
        disabled={registerStatus === 'pending'}
        onClick={handleRegister}
        icon={<Key size={16} />}
        iconPosition="left"
      >
        {registerStatus === 'pending' ? 'Waiting for passkey…' : 'Register a new passkey'}
      </Button>

      {error && (
        <p
          style={{
            color: 'var(--theme-error-500)',
            fontSize: 'var(--font-size-small)',
            marginTop: 'calc(var(--base) / 4)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
