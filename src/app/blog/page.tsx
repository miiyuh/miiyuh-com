'use client'

import { useState } from 'react'

export default function Blog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-[#FAF3E0] font-sans">
      {/* 🌟 Header */}
      <header className="px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-[#FAF3E0]/20 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="./">
            <img
              src="/assets/img/logo_miiyuh_text_white_v1.png"
              alt="miiyuh logo"
              className="h-10"
            />
          </a>

          {/* Hamburger Button */}
          <button
            id="menu-toggle"
            className="lg:hidden focus:outline-none z-50"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-[#FAF3E0]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-6 text-sm font-bold">
            <li>
              <a href="aboutme" className="hover:underline">
                about me
              </a>
            </li>
            <li>
              <a href="socials" className="hover:underline">
                socials
              </a>
            </li>
            <li>
              <a href="gallery" className="hover:underline">
                gallery
              </a>
            </li>
            <li>
              <a href="blog" className="hover:underline">
                blog
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <ul
          id="mobile-menu"
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } flex-col gap-4 text-sm font-bold bg-[#1A1A1A] px-6 py-4 mt-4 border-t border-[#FAF3E0]/20 lg:hidden absolute w-full z-40`}
        >
          <li>
            <a href="aboutme" className="hover:underline">
              about me
            </a>
          </li>
          <li>
            <a href="socials" className="hover:underline">
              socials
            </a>
          </li>
          <li>
            <a href="gallery" className="hover:underline">
              gallery
            </a>
          </li>
          <li>
            <a href="blog" className="hover:underline">
              blog
            </a>
          </li>
        </ul>
      </header>

      {/* 🧩 Page Content */}
      <main className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">blog 📰</h1>
        <p className="text-lg text-[#FAF3E0]/90 mb-6">
          this is where i will post my blog, if i have any.
        </p>

        <div className="w-full">
          <iframe
            src="https://miiyuh.blogspot.com/"
            className="w-full h-[1000px] rounded-lg border border-[#FAF3E0]/20"
            loading="lazy"
          ></iframe>
        </div>
      </main>

      {/* 📌 Footer */}
      <footer className="text-center text-sm text-[#FAF3E0]/70 py-6">
        <p>© 2025 miiyuh | made in malaysia!</p>
      </footer>
    </div>
  )
}