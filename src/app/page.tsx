'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function HomePage() {
  const playClick = useSound('/sounds/click.mp3', 0.7)
  return (
    <>
      <Head>
        <title>miiyuh — creative webpage</title>
        <meta
          name="description"
          content="welcome to miiyuh's official webpage. explore about me, socials, gallery, and blog."
        />
      </Head>

      {/* Main full height container */}
      <main className="flex flex-col min-h-[70vh] items-center justify-center px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        {/* Inner content centered */}
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-12">
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
            {[
              { href: '/aboutme', label: 'about me' },
              { href: '/socials', label: 'socials' },
              { href: '/gallery', label: 'gallery' },
              { href: '/blog', label: 'blog' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={playClick}
                className="group text-3xl font-bold lowercase tracking-tighter transition-transform duration-300 hover:scale-110"
              >
                <span className="block group-hover:underline group-hover:decoration-[#FAF3E0]/70">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <SpeedInsights />
      </main>
    </>
  )
}
