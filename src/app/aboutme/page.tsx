'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutMePage() {
  useEffect(() => {
    const toggleBtn = document.getElementById('menu-toggle')
    const mobileMenu = document.getElementById('mobile-menu')

    const toggleMenu = () => {
      mobileMenu?.classList.toggle('hidden')
      mobileMenu?.classList.toggle('flex')
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenu &&
        toggleBtn &&
        !mobileMenu.contains(event.target as Node) &&
        !toggleBtn.contains(event.target as Node)
      ) {
        mobileMenu.classList.add('hidden')
        mobileMenu.classList.remove('flex')
      }
    }

    toggleBtn?.addEventListener('click', toggleMenu)
    document.addEventListener('click', handleClickOutside)

    return () => {
      toggleBtn?.removeEventListener('click', toggleMenu)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen bg-[#1A1A1A] text-[#FAF3E0] font-sans">
      {/* 🌟 Header */}
      <header className="px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-[#FAF3E0]/20 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/img/logo_miiyuh_text_white_v1.png"
              alt="miiyuh logo"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Hamburger Button */}
          <button id="menu-toggle" className="lg:hidden focus:outline-none z-50">
            <svg
              className="w-6 h-6 text-[#FAF3E0]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-6 text-sm font-bold">
            <li><Link href="/aboutme" className="hover:underline">about me</Link></li>
            <li><Link href="/socials" className="hover:underline">socials</Link></li>
            <li><Link href="/gallery" className="hover:underline">gallery</Link></li>
            <li><Link href="/blog" className="hover:underline">blog</Link></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <ul
          id="mobile-menu"
          className="hidden flex-col gap-4 text-sm font-bold bg-[#1A1A1A] px-6 py-4 mt-4 border-t border-[#FAF3E0]/20 lg:hidden absolute w-full z-40"
        >
          <li><Link href="/aboutme" className="hover:underline">about me</Link></li>
          <li><Link href="/socials" className="hover:underline">socials</Link></li>
          <li><Link href="/gallery" className="hover:underline">gallery</Link></li>
          <li><Link href="/blog" className="hover:underline">blog</Link></li>
        </ul>
      </header>

      {/* 🧩 Page Content */}
      <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/assets/img/kazuha.png"
              alt="kazuha"
              width={300}
              height={300}
              className="max-w-xs w-full rounded-lg"
            />
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl font-bold tracking-tighter mb-4">about me 🍁</h1>
            <p className="text-lg leading-relaxed tracking-tight text-[#FAF3E0]/90">
              i am rather a not-so-interesting person. very basic to be honest. when i have free time, i usually play games and maybe sometimes draw, depends on my mood. also, i sleep a LOT. any time i see fit, i would sleep. sleeping is the best, could not argue about it :&gt;
            </p>
          </div>
        </div>
      </section>

      {/* 📌 Footer */}
      <footer className="text-center text-sm text-[#FAF3E0]/70 py-6">
        <p>© 2025 miiyuh | made in malaysia!</p>
      </footer>
    </main>
  )
}