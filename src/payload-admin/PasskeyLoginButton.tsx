'use client'

import { useRef, useState } from 'react'
import { startAuthentication } from '@simplewebauthn/browser'
import { Button } from '@payloadcms/ui'
import { KeyIcon } from '@phosphor-icons/react'

export default function PasskeyLoginButton() {
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSignIn = async () => {
    if (!username) {
      setError('Enter your username first.')
      inputRef.current?.focus()
      return
    }

    setStatus('pending')
    setError('')

    try {
      const optionsRes = await fetch('/api/users/webauthn/authentication/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username }),
      })
      if (!optionsRes.ok) {
        const body = await optionsRes.json().catch(() => null)
        throw new Error(body?.error === 'not_configured' ? 'not_configured' : 'failed')
      }
      const options = await optionsRes.json()

      const assertion = await startAuthentication({ optionsJSON: options })

      const verifyRes = await fetch('/api/users/webauthn/authentication/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ response: assertion }),
      })
      if (!verifyRes.ok) {
        const body = await verifyRes.json().catch(() => null)
        if (body?.error === 'not_configured') throw new Error('not_configured')
        if (verifyRes.status === 423) {
          setStatus('error')
          setError(body?.message || 'Too many failed attempts. Please try again later or use your password.')
          return
        }
        throw new Error('failed')
      }

      window.location.href = '/admin'
      return
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error && err.message === 'not_configured'
          ? 'Passkeys are not configured on this server. Please use your password.'
          : 'Passkey sign-in failed. Please try again or use your password.',
      )
    }
    setStatus('idle')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--base) / 2)',
        marginBottom: 'var(--base)',
      }}
    >
      <div className="field-type text" style={{ flex: '1 1 auto' }}>
        <label className="field-label" htmlFor="field-passkey-username">
          Username or email
        </label>
        <div className="field-type__wrap">
          <input
            id="field-passkey-username"
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                void handleSignIn()
              }
            }}
          />
        </div>
      </div>

      <Button
        buttonStyle="secondary"
        size="large"
        type="button"
        disabled={status === 'pending'}
        onClick={handleSignIn}
        icon={<KeyIcon size={18} weight="bold" />}
        iconPosition="left"
      >
        {status === 'pending' ? 'Waiting for passkey…' : 'Sign in with a passkey'}
      </Button>

      {error && (
        <p
          style={{
            color: 'var(--theme-error-500)',
            fontSize: 'var(--font-size-small)',
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'calc(var(--base) / 2)',
          color: 'var(--theme-elevation-400)',
          fontSize: 'var(--font-size-small)',
          margin: 0,
        }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--theme-elevation-150)' }} />
        or continue with your password
        <span style={{ flex: 1, height: 1, background: 'var(--theme-elevation-150)' }} />
      </div>
    </div>
  )
}
