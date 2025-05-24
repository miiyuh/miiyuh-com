'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function SocialsPage() {
  const [, setMenuOpen] = useState(false)
  
  const menuRef = useRef<HTMLUListElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const socials = [
    'anilist', 'bsky', 'github', 'instagram', 'ko-fi', 'linkedin',
    'myanimelist', 'pinterest', 'spacehey', 'spotify', 'steam',
    'tiktok', 'twitch', 'twitter', 'youtube'
  ]

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">

      {/* Main Content */}
      <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col">
        <div className="mb-12 text-left">
          <h1 className="text-5xl font-bold tracking-tighter mb-2">socials ✨</h1>
          <p className="text-lg text-[#FAF3E0]/90">my accounts, duh.</p>
        </div>

        <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 text-center">
          {socials.map((social) => (
            <a
              key={social}
              href={`/${social}`}
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
      </section>
    </main>
  )
}
