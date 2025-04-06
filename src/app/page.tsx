'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen text-[#FAF3E0] bg-[#1A1A1A] font-sans">
      {/* Logo */}
      <div className="mb-12 mt-24">
        <Image
          src="/assets/img/logo_miiyuh_text_white_v2.png"
          alt="miiyuh logo"
          width={320}
          height={80}
          className="mx-auto w-80"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6">
        <Link href="/aboutme" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
          about me
        </Link>
        <Link href="/socials" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
          socials
        </Link>
        <Link href="/gallery" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
          gallery
        </Link>
        <Link href="/blog" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
          blog
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-[#FAF3E0]/70 py-6">
        <p>© 2025 miiyuh | made in malaysia!</p>
      </footer>
    </main>
  )
}
