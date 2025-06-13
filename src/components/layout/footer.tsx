'use client'

import Link from 'next/link'
import { MalaysiaFlag } from '@/utils'

export default function Footer() {
  return (
    <footer className="font-serif text-center text-sm text-[#FAF3E0]/70 py-6 flex flex-col gap-2">
      <p>© 2025 miiyuh 🍁 | made in malaysia! <MalaysiaFlag /></p>
      <div className="flex justify-center gap-4 text-xs">
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">
          privacy policy
        </Link>
        <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:underline">
          terms of service
        </Link>
      </div>
    </footer>
  )
}
