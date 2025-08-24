'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SOCIAL_PLATFORMS, SOCIAL_USERNAMES } from '@/constants'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function SocialsPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

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
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  data-cursor="link"
                >
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">socials</span>
              </li>
            </ol>
          </nav>

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
              find me across the digital universe. connect, follow, or just say hi!
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
                <div className="group relative backdrop-blur-sm rounded-xl p-6 motion-safe:hover:motion-preset-bounce cursor-pointer border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40 overflow-hidden">

                  {/* Main Link */}
                  <a
                    href={`/${social}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="relative z-0 block text-center focus:outline-none"
                    data-cursor="link"
                  >
                    {/* Social Media Icon */}
                    <div className="relative mb-3">
                      <Image
                        src={`/assets/img/social_media_icons/${social}.png`}
                        alt={social}
                        width={80}
                        height={80}
                        className="mx-auto w-16 h-16 md:w-20 md:h-20 group-hover:motion-preset-pulse group-hover:brightness-110"
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
                        {SOCIAL_USERNAMES[social] || '@miiyuh'}
                      </p>
                    </div>


                  </a>


                </div>
              </ScrollAnimation>
            ))}
          </section>
        </div>


      </section>
    </main>
  )
}
