'use client'

import Image from 'next/image'
import { SOCIAL_PLATFORMS } from '@/constants'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function SocialsPage() {
  const [mounted, setMounted] = useState(false)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Copy platform URL to clipboard
  const copyToClipboard = async (platform: string) => {
    try {
      const url = `https://miiyuh.com/${platform}`
      await navigator.clipboard.writeText(url)
      setCopiedPlatform(platform)
      setTimeout(() => setCopiedPlatform(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Format platform name for display
  const formatPlatformName = (platform: string) => {
    return platform.replace(/([A-Z])/g, ' $1').trim().toLowerCase()
  }

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">

      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Main Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header Section */}
          <div className="mb-12 text-left">
            <div className="mb-6">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                socials ✨
              </h1>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              find me across the digital universe. connect, follow, or just say hi! 🌐
            </p>
          </div>

          {/* Enhanced Social Icons Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {SOCIAL_PLATFORMS.map((social, index) => (
              <ScrollAnimation
                key={social}
                animation="fadeUp"
                delay={0.1 * index}
              >
                <div className="group relative bg-gradient-to-br from-[#FAF3E0]/10 to-[#FAF3E0]/5 backdrop-blur-sm rounded-xl p-6 hover:from-[#FAF3E0]/15 hover:to-[#FAF3E0]/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40 overflow-hidden">
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-transparent via-[#FAF3E0]/10 to-transparent"></div>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      copyToClipboard(social)
                      playClick()
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 rounded-lg bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 focus:outline-none z-10"
                    title="Copy link"
                  >
                    {copiedPlatform === social ? (
                      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>

                  {/* Main Link */}
                  <a
                    href={`/${social}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="relative z-0 block text-center focus:outline-none"
                  >
                    {/* Social Media Icon */}
                    <div className="relative mb-3">
                      <Image
                        src={`/assets/img/social_media_icons/${social}.png`}
                        alt={social}
                        width={80}
                        height={80}
                        className="mx-auto w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-all duration-300 group-hover:brightness-110 group-hover:-translate-y-1"
                        loading="lazy"
                        quality={90}
                      />
                    </div>

                    {/* Platform name */}
                    <div className="relative z-10">
                      <h3 className="font-bold text-sm mb-1 group-hover:text-[#FAF3E0] transition-colors duration-300 lowercase">
                        {formatPlatformName(social)}
                      </h3>
                      <p className="text-xs text-[#FAF3E0]/60 group-hover:text-[#FAF3E0]/80 transition-colors duration-300 font-serif lowercase">
                        @miiyuh
                      </p>
                    </div>

                    {/* Hover background effect - covers entire content area */}
                    <div className="absolute inset-0 bg-[#FAF3E0]/5 rounded-xl scale-0 group-hover:scale-110 transition-transform duration-300 -z-10"></div>
                  </a>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FAF3E0]/50 to-transparent group-hover:w-full transition-all duration-500"></div>
                </div>
              </ScrollAnimation>
            ))}
          </section>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            social butterfly mode 🦋
          </p>
        </div>
      </section>
    </main>
  )
}
