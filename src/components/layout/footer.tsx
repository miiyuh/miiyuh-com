'use client'

import Link from 'next/link'
import { ShieldUser, Handshake } from 'lucide-react'
import { MalaysiaFlag } from '@/utils'

export default function Footer() {
  return (
    <footer className="font-serif text-base border-t border-white/10 text-[#FAF3E0]/70 py-6 px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left side - Copyright */}
        <p className="text-center sm:text-left">
          © 2025 miiyuh 🍁 | made in malaysia! <MalaysiaFlag />
        </p>

        {/* Right side - Legal links with icons */}
        <div className="flex gap-4">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-[#FAF3E0]/90 transition-colors duration-300"
          >
            <ShieldUser className="w-3 h-3" />
            privacy policy
          </Link>
          <Link
            href="/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-[#FAF3E0]/90 transition-colors duration-300"
          >
            <Handshake className="w-3 h-3" />
            terms of service
          </Link>
        </div>
      </div>
    </footer>
  )
}
