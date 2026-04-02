'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowSquareOut } from '@phosphor-icons/react'
import type { AboutEntry } from '@/types/about'
import { useWebHaptics } from 'web-haptics/react'

interface EntryCardProps {
  entry: AboutEntry
  fallbackIcon: React.ReactNode
}

export function EntryCard({ entry, fallbackIcon }: EntryCardProps) {
  const haptic = useWebHaptics()
  const [isLogoLoaded, setIsLogoLoaded] = useState(false)
  const [hasLogoError, setHasLogoError] = useState(false)

  const showLogo = Boolean(entry.logo?.url) && !hasLogoError

  return (
    <div className="group relative p-5 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/12 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          {showLogo ? (
            <div className="relative w-full h-full overflow-hidden rounded-md">
              {!isLogoLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/10" aria-hidden="true" />
              )}
              <Image
                src={entry.logo!.url}
                alt={entry.logo?.alt || entry.title}
                width={48}
                height={48}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  isLogoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                quality={75}
                sizes="48px"
                onLoad={() => setIsLogoLoaded(true)}
                onError={() => {
                  setHasLogoError(true)
                  setIsLogoLoaded(true)
                }}
              />
            </div>
          ) : (
            fallbackIcon
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-1">
            <h2 className="text-lg md:text-xl font-semibold text-text-primary">{entry.title}</h2>
            <span className="font-serif text-sm md:text-base text-text-secondary/60 whitespace-nowrap tracking-wider">
              {entry.startDate}{entry.endDate ? ` - ${entry.endDate}` : ''}
            </span>
          </div>
          {entry.subtitle && (
            <p className="text-base text-accent-primary font-medium mt-1 mb-2">{entry.subtitle}</p>
          )}
          {entry.description && (
            <p className="text-text-secondary text-sm leading-relaxed mt-2">{entry.description}</p>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {entry.tags.map((t, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 text-text-muted/50 rounded-full bg-white/4">
                  {t.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {entry.link && (
        <Link
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg hover:bg-accent-primary hover:text-bg-primary transition-colors"
          onClick={() => haptic.trigger('light')}
        >
          <ArrowSquareOut className="w-4 h-4" weight="bold" />
        </Link>
      )}
    </div>
  )
}
