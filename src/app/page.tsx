'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { NAVIGATION_LINKS } from '@/constants'

export default function HomePage() {
  const playClick = useSound('/sounds/click.mp3', 0.7)
  return (
    <>
      <Head>
        <title>miiyuh&apos;s webpage</title>
        <meta
          name="description"
          content="welcome to miiyuh's webpage. explore about me, my socials, pictures taken by me, and my blog."
        />
      </Head>      {/* Main full height container */}
      <main className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 xl:px-32" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Inner content centered */}
        <div className="flex flex-col items-center">
          {/* Logo */}          <div className="mb-12">
            <Image
              src="/assets/img/logo_miiyuh_text_white_v2.png"
              alt="miiyuh - personal webpage logo"
              width={320}
              height={80}
              className="mx-auto w-120"
              priority
              quality={90}
            />
          </div>{/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {NAVIGATION_LINKS.map((link) => (
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
      </main>
    </>
  )
}
