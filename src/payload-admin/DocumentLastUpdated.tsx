'use client'

import { useDocumentInfo } from '@payloadcms/ui'

export default function DocumentLastUpdated() {
  const { savedDocumentData } = useDocumentInfo()
  const updatedAt = (savedDocumentData as { updatedAt?: string } | undefined)?.updatedAt

  if (!updatedAt) return null

  const date = new Date(updatedAt)
  const myt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(',', '')
  const utc = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(',', '')

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
      Last saved {myt} (MYT) · {utc} (UTC)
    </div>
  )
}
