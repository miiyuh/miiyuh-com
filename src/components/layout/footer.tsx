'use client'

import Link from 'next/link'
import { ShieldUser, Handshake } from 'lucide-react'
import { useWebHaptics } from 'web-haptics/react'

export default function Footer() {
  const haptic = useWebHaptics()
  return (
    <footer className="font-serif text-base border-t border-white/8 text-[#FAF3E0]/70 py-8 px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left side - Copyright */}
        <p className="text-center sm:text-left">
          © 2025 miiyuh 🍁 | made in malaysia! 🇲🇾
        </p>

        {/* Right side - Legal links with icons */}
        <div className="flex gap-4">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-[#FAF3E0]/90 transition-colors duration-300"
            onClick={() => haptic.trigger('light')}
          >
            <ShieldUser className="w-3 h-3" />
            privacy policy
          </Link>
          <Link
            href="/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-[#FAF3E0]/90 transition-colors duration-300"
            onClick={() => haptic.trigger('light')}
          >
            <Handshake className="w-3 h-3" />
            terms of service
          </Link>
        </div>
      </div>
    </footer>
  )
}
