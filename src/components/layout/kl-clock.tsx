'use client'

import { useSyncExternalStore } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kuala_Lumpur',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000)
  return () => window.clearInterval(id)
}
const getTime = () => formatter.format(new Date())
// Unknown at build/render time (pages are static); filled in after hydration
const getServerTime = () => null

// Live "kuala lumpur 14:32" for the footer
export function KlClock() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime)

  return (
    <p className="flex items-baseline gap-2 text-sm text-text-muted">
      <span>kuala lumpur</span>
      <span className="font-paper-mono tabular-nums text-text-secondary min-w-[5ch]" aria-live="off">
        {time ?? '--:--'}
      </span>
      <span className="text-text-muted/70">GMT+8</span>
    </p>
  )
}
