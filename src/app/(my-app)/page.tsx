'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { NAVIGATION_LINKS } from '@/constants'
import { useEffect, useState } from 'react'
import { useRouteLoading } from '@/components/layout/route-loading-provider'

const getPadding = (width: number) => {
  if (width >= 1280) return 128
  if (width >= 1024) return 96
  if (width >= 768) return 48
  return 24
}

export default function HomePage() {
  const playClick = useSound('/sounds/click.mp3', 0.7)
  const { startPortalLoading } = useRouteLoading()
  const [mounted, setMounted] = useState(false)
  const [padding, setPadding] = useState(24)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updatePadding = () => {
      if (typeof window === 'undefined') return
      setPadding(getPadding(window.innerWidth))
    }

    updatePadding()
    window.addEventListener('resize', updatePadding)
    return () => window.removeEventListener('resize', updatePadding)
  }, [])

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative md:h-[calc(100vh-var(--header-height,80px)-var(--footer-height,60px))] md:overflow-hidden overflow-y-auto">
      {/* Page Content */}
      <section
        className="relative flex flex-col justify-start md:justify-center w-full md:h-full"
        style={{ paddingLeft: padding, paddingRight: padding }}
      >
        {/* Row 1: Logo (2 cols on md+, full width on mobile) + Text (3 cols on md+, full width on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-white/10 mt-6 md:mt-0 mb-0">
          {/* Logo - 2 columns on md+, full width on mobile */}
          <div
            className="relative border-b border-white/10 md:col-span-2 group/logo"
            style={{ transitionDelay: mounted ? '100ms' : '0ms' }}
          >
            {/* Iridescent hover background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,200,80,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,180,50,0.1),transparent_45%),radial-gradient(circle_at_60%_80%,rgba(200,160,80,0.08),transparent_50%)] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ aspectRatio: '2 / 1' }}>
              <Image
                src="/assets/img/logo_miiyuh_v4-white_with-border.png"
                alt="miiyuh - personal webpage logo"
                width={200}
                height={200}
                className="object-contain w-full h-auto"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Text area - spans 3 columns on md+, full width on mobile */}
          <div
            className="relative border-b md:border-l border-white/10 md:col-span-3 group/text"
            style={{ transitionDelay: mounted ? '200ms' : '0ms' }}
          >
            {/* Iridescent hover background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,100,200,0.1),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(100,200,255,0.1),transparent_45%),radial-gradient(circle_at_60%_80%,rgba(150,255,100,0.08),transparent_50%)] opacity-0 group-hover/text:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-center p-4 sm:p-6 md:p-8">
              <h1 className="font-serif italic text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-text-primary line-clamp-2 sm:whitespace-nowrap">
                welcome to my little corner on the internet 💫
              </h1>
            </div>
          </div>
        </div>

        {/* Row 2: 5 Navigation Cards - 1 column on mobile, 5 columns on desktop */}
        <div className="relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {NAVIGATION_LINKS.map((link, index) => {
              // Card gradient presets for variety on hover (matching socials page)
              const gradientPresets = [
                'bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.15),transparent_55%),radial-gradient(circle_at_75%_15%,rgba(255,168,88,0.18),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(121,94,255,0.16),transparent_65%)]',
                'bg-[radial-gradient(circle_at_20%_35%,rgba(121,94,255,0.16),transparent_58%),radial-gradient(circle_at_78%_25%,rgba(72,225,182,0.18),transparent_62%),radial-gradient(circle_at_55%_75%,rgba(255,203,112,0.14),transparent_68%)]',
                'bg-[radial-gradient(circle_at_28%_28%,rgba(255,110,180,0.15),transparent_56%),radial-gradient(circle_at_75%_30%,rgba(96,182,255,0.18),transparent_64%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.12),transparent_70%)]',
                'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_52%),radial-gradient(circle_at_80%_18%,rgba(255,168,88,0.16),transparent_60%),radial-gradient(circle_at_50%_82%,rgba(72,225,182,0.16),transparent_68%)]'
              ] as const
              return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  startPortalLoading(link.href)
                  playClick()
                }}
                className="group/card block transition-all duration-500"
                data-cursor="hover"
                style={{ transitionDelay: mounted ? `${300 + index * 50}ms` : '0ms' }}
              >
                <div className={`relative overflow-hidden border-b ${link.href === '/socials' || link.href === '/gallery' || link.href === '/projects' || link.href === '/blog' ? 'md:border-l' : ''} border-white/10 bg-transparent transition-all duration-500 hover:z-10 min-h-24 sm:min-h-32 md:aspect-square`}>
                  {/* Gradient overlay on hover - matching socials page */}
                  <div className={`absolute inset-0 ${gradientPresets[index % gradientPresets.length]} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 md:p-6 gap-2 sm:gap-3 md:gap-4">
                    <div className="flex items-start justify-between">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl group-hover/card:scale-110 transition-transform duration-300 font-emoji" style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" }}>
                        {link.href === '/aboutme' && '🍁'}
                        {link.href === '/socials' && '✨'}
                        {link.href === '/gallery' && '📸'}
                        {link.href === '/projects' && '🚀'}
                        {link.href === '/blog' && '📰'}
                      </div>
                    </div>
                    <div className="text-left space-y-0.5 sm:space-y-1">
                      <h3 className="font-serif text-sm sm:text-lg md:text-2xl lg:text-3xl text-text-primary tracking-tight lowercase group-hover/card:text-[#FAF3E0] transition-colors duration-300">
                        {link.label}
                      </h3>
                      <p className="text-xs sm:text-xs md:text-sm text-text-secondary font-light group-hover/card:text-[#FAF3E0]/90 transition-colors duration-300 line-clamp-2">
                        {link.href === '/aboutme' && 'get to know me better'}
                        {link.href === '/socials' && 'find me everywhere'}
                        {link.href === '/gallery' && 'photos & artwork'}
                        {link.href === '/projects' && "things i've built"}
                        {link.href === '/blog' && 'my thoughts & stories'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}