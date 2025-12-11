'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SOCIAL_PLATFORMS, SOCIAL_USERNAMES } from '@/constants'
import { useSound } from '@/hooks/useSound'
import { ExternalLink } from 'lucide-react'
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

  // Card gradient presets for variety on hover
  const gradientPresets = [
    'bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.15),transparent_55%),radial-gradient(circle_at_75%_15%,rgba(255,168,88,0.18),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(121,94,255,0.16),transparent_65%)]',
    'bg-[radial-gradient(circle_at_20%_35%,rgba(121,94,255,0.16),transparent_58%),radial-gradient(circle_at_78%_25%,rgba(72,225,182,0.18),transparent_62%),radial-gradient(circle_at_55%_75%,rgba(255,203,112,0.14),transparent_68%)]',
    'bg-[radial-gradient(circle_at_28%_28%,rgba(255,110,180,0.15),transparent_56%),radial-gradient(circle_at_75%_30%,rgba(96,182,255,0.18),transparent_64%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.12),transparent_70%)]',
    'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_52%),radial-gradient(circle_at_80%_18%,rgba(255,168,88,0.16),transparent_60%),radial-gradient(circle_at_50%_82%,rgba(72,225,182,0.16),transparent_68%)]'
  ] as const

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-hidden">

      {/* Page Content */}
      <section
        className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 py-24 min-h-[70vh]"
        style={{ paddingTop: '24px' }}
      >

        <div>
          {/* Breadcrumb Navigation */}
          <div
            className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ marginBottom: 'calc(var(--spacing) * 8)' }}
          >
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'socials' },
              ]}
              className="mb-0"
            />
          </div>

          {/* Header */}
          <div
            className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
            style={{ transitionDelay: mounted ? '100ms' : '0ms' }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary">
              socials
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl font-light">
              find me across the digital landscape.
            </p>
          </div>

          {/* Staggered Grid Layout - borders act as grid lines */}
          <div className="relative w-full border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {SOCIAL_PLATFORMS.map((social, index) => (
              <a
                key={social}
                href={`/${social}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className={`group/card block h-full transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                data-cursor="link"
                style={{ transitionDelay: mounted ? `${200 + index * 50}ms` : '0ms' }}
              >
                  <div className="relative h-full aspect-square overflow-hidden border-r border-b border-white/10 bg-transparent transition-all duration-500 hover:bg-white/5 hover:z-10">
                    <div className={`absolute inset-0 ${gradientPresets[index % gradientPresets.length]} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-linear-to-b from-white/8 via-white/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 h-full flex flex-col justify-between p-6 gap-4">
                      <div className="flex items-start justify-between">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-[-18px] rounded-full bg-white/5 blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                          <Image
                            src={`/assets/img/social_media_icons/${social}.png`}
                            alt={formatPlatformName(social)}
                            width={80}
                            height={80}
                            className="w-14 h-14 md:w-16 md:h-16 object-contain grayscale group-hover/card:grayscale-0 transition-all duration-500 drop-shadow-lg"
                            loading="lazy"
                            quality={90}
                          />
                        </div>
                        <ExternalLink className="w-4 h-4 text-accent-primary opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 translate-y-1" />
                      </div>

                      <div className="text-left space-y-2">
                        <span
                          className="block font-serif text-2xl text-text-primary tracking-tight group-hover/card:text-accent-primary transition-colors duration-300"
                          style={{ fontVariant: 'small-caps' }}
                        >
                          {formatPlatformName(social)}
                        </span>
                        {SOCIAL_USERNAMES[social] && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[13px] font-mono text-text-secondary border border-white/10">
                            <span className="lowercase">{SOCIAL_USERNAMES[social]}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-accent-primary" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
            ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
