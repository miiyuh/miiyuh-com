'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SOCIAL_PLATFORMS } from '@/constants'
import { useSound } from '@/hooks/useSound'
import { ExternalLink } from 'lucide-react'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'

export default function SocialsPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Helper to format platform names
  const formatPlatformName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')
  }

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-hidden">

      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-24 min-h-[70vh]">

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'socials' },
            ]}
            className="mb-16"
          />

          {/* Header */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary">
              connect
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl font-light">
              Find me across the digital landscape.
            </p>
          </div>

          {/* Staggered Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto w-full">
            {SOCIAL_PLATFORMS.map((social, index) => (
              <ScrollAnimation
                key={social}
                animation="fadeUp"
                delay={0.1 + (index * 0.05)}
                className="w-full"
              >
                <a
                  href={`/${social}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="group block h-full"
                  data-cursor="link"
                >
                  <div className="h-full min-h-[180px] p-6 glass-panel-pro rounded-3xl hover:border-accent-primary/30 transition-all duration-500 flex flex-col items-center justify-center gap-6 relative overflow-hidden">

                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon */}
                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={`/assets/img/social_media_icons/${social}.png`}
                        alt={formatPlatformName(social)}
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-lg"
                        loading="lazy"
                        quality={90}
                      />
                    </div>

                    {/* Label */}
                    <div className="relative z-10">
                      <span className="font-serif text-lg text-text-muted group-hover:text-text-primary transition-colors duration-300 border-b border-transparent group-hover:border-accent-primary/50 pb-1">
                        {formatPlatformName(social)}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ExternalLink className="w-4 h-4 text-accent-primary" />
                    </div>
                  </div>
                </a>
              </ScrollAnimation>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
