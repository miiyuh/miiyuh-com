'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function SocialsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Correct typing of the refs
  const menuRef = useRef<HTMLUListElement | null>(null);  // For the menu
  const toggleRef = useRef<HTMLButtonElement | null>(null);  // For the toggle button

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const socials = [
    'anilist', 'bsky', 'github', 'instagram', 'ko-fi', 'linkedin',
    'myanimelist', 'pinterest', 'spacehey', 'spotify', 'steam',
    'tiktok', 'twitch', 'twitter', 'youtube'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-[#FAF3E0] font-sans">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-[#FAF3E0]/20 relative">
        <div className="flex items-center justify-between">
          <a href="/page">
            <Image src="/assets/img/logo_miiyuh_text_white_v1.png" alt="miiyuh logo" width={160} height={40} className="h-10 w-auto" />
          </a>

          <button ref={toggleRef} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none z-50">
            <svg className="w-6 h-6 text-[#FAF3E0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul className="hidden lg:flex gap-6 text-sm font-bold">
            <li><a href="/aboutme" className="hover:underline">about me</a></li>
            <li><a href="/socials" className="hover:underline">socials</a></li>
            <li><a href="/gallery" className="hover:underline">gallery</a></li>
            <li><a href="/blog" className="hover:underline">blog</a></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <ul ref={menuRef} className={`$ {menuOpen ? 'flex' : 'hidden'} flex-col gap-4 text-sm font-bold bg-[#1A1A1A] px-6 py-4 mt-4 border-t border-[#FAF3E0]/20 lg:hidden absolute w-full z-40`}>
          <li><a href="/aboutme" className="hover:underline">about me</a></li>
          <li><a href="/socials" className="hover:underline">socials</a></li>
          <li><a href="/gallery" className="hover:underline">gallery</a></li>
          <li><a href="/blog" className="hover:underline">blog</a></li>
        </ul>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <div className="mb-12 text-left">
          <h1 className="text-5xl font-bold tracking-tighter mb-2">socials ✨</h1>
          <p className="text-lg text-[#FAF3E0]/90">my accounts, duh.</p>
        </div>

        <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 text-center">
          {socials.map((social) => (
            <a
              key={social}
              href={`https://miiyuh.com/${social}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/assets/img/social_media_icons/${social}.png`}
                alt={social}
                width={96}
                height={96}
                className="mx-auto w-24 hover:scale-110 transition-transform"
              />
            </a>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-[#FAF3E0]/70 py-6">
        <p>© 2025 miiyuh 🍁 | made in malaysia! 🇲🇾</p>
      </footer>
    </div>
  );
}