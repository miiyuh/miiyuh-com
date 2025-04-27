'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header'

export default function ClientHeader() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null // ❌ No Header on homepage
  }

  return (
    <div className="sticky top-0 z-50 bg-[#1A1A1A]">
      <Header />
    </div>
  )
}
