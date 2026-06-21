'use client'

import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/admin"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/img/logo_miiyuh_v4-white.png"
        alt=""
        width={128}
        height={64}
        style={{ height: 64, width: 'auto' }}
      />
    </Link>
  )
}
