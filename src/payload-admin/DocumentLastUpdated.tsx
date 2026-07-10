'use client'

import { useDocumentInfo } from '@payloadcms/ui'

export default function DocumentLastUpdated() {
  const { savedDocumentData } = useDocumentInfo()
  const updatedAt = (savedDocumentData as { updatedAt?: string } | undefined)?.updatedAt

  if (!updatedAt) return null

  return (
    <div
      style={{
        fontSize: 'var(--font-size-small)',
        color: 'var(--theme-elevation-400)',
        display: 'flex',
        alignItems: 'center',
        marginRight: 'calc(var(--base) / 2)',
      }}
    >
      Last saved {new Date(updatedAt).toISOString().slice(0, 10)}
    </div>
  )
}
