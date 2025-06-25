'use client'

import Link from 'next/link'
import { MalaysiaFlag } from '@/utils'

export default function Footer() {
  return (
    <footer className="font-serif text-sm text-[#FAF3E0]/70 py-6 px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left side - Copyright */}
        <p className="text-center sm:text-left">
          © 2025 miiyuh 🍁 | made in malaysia! <MalaysiaFlag />
        </p>
        
        {/* Right side - Legal links with icons */}
        <div className="flex gap-4 text-xs">
          <Link 
            href="/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:underline hover:text-[#FAF3E0]/90 transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            privacy policy
          </Link>
          <Link 
            href="/terms-of-service" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:underline hover:text-[#FAF3E0]/90 transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            terms of service
          </Link>
        </div>
      </div>
    </footer>
  )
}
