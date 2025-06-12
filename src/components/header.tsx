'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { NAVIGATION_LINKS } from '@/constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const playClick = useSound('/sounds/click.mp3', 0.7) // 🎵 your click sound

  const toggleMenu = () => {
    playClick()
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-[#FAF3E0]/20 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}        <Link href="/" onClick={playClick}>
          <Image 
            src="/assets/img/logo_miiyuh_text_white_v1.png" 
            alt="miiyuh - return to homepage" 
            width={160} 
            height={40} 
            className="h-10 w-auto" 
            priority
            quality={90}
          />
        </Link>

        {/* Hamburger */}
        <button onClick={toggleMenu} className="lg:hidden focus:outline-none z-50">
          <svg className="w-6 h-6 text-[#FAF3E0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 text-sm font-bold">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={playClick} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>      {/* Mobile Menu */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} lg:hidden`}>
        <ul className="flex flex-col gap-4 text-sm font-bold bg-[#1A1A1A] px-6 py-4 border-t border-[#FAF3E0]/20">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={playClick} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
