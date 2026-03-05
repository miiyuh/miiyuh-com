'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { NAVIGATION_LINKS } from '@/constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="bg-[#070707]/80 backdrop-blur-xl px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-white/8 relative z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/assets/img/logo_miiyuh_v4-white.png"
              alt="miiyuh - return to homepage"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
              quality={75}
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden focus:outline-none z-50 relative"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6 text-[#FAF3E0]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16" style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms ease-in-out' }} />
              <path d="M4 12h16" style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms ease-in-out' }} />
              <path d="M4 18h16" style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms ease-in-out' }} />
              <line x1="5" y1="5" x2="19" y2="19" style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 200ms ease-in-out' }} />
              <line x1="19" y1="5" x2="5" y2="19" style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 200ms ease-in-out' }} />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 text-xl font-serif">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Mobile Menu Overlay — rendered outside header to avoid stacking context issues */}
      <div
        className={`fixed inset-0 z-30 bg-[#070707]/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col gap-8 text-5xl font-serif text-left">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="hover:text-accent-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
