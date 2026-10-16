'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  AVAILABLE_LOCALES,
  localizePath,
  splitLocalePath,
  type LocaleCode,
} from '@/lib/locale'
import { useLocale } from '@/lib/locale-context'

export default function LocaleToggle() {
  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // Same page in the other locale, keeping the query string and #hash
  const setLocale = useCallback((code: LocaleCode) => {
    if (code === currentLocale) return
    const { path } = splitLocalePath(pathname)
    router.push(`${localizePath(path, code)}${window.location.search}${window.location.hash}`)
  }, [currentLocale, pathname, router])

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 text-xs font-sans tracking-wide">
      {AVAILABLE_LOCALES.map((locale) => {
        const isActive = currentLocale === locale.code

        return (
          <button
            key={locale.code}
            onClick={() => setLocale(locale.code)}
            className={`group relative px-2.5 py-1.5 transition duration-200 first:rounded-l-full last:rounded-r-full cursor-pointer ${
              isActive
                ? 'bg-text-primary text-black font-medium'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-primary/80 hover:backdrop-blur-xl'
            }`}
            aria-label={`Switch to ${locale.labelFull}`}
            aria-pressed={isActive}
          >
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-text-primary text-bg-primary text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {currentLocale === 'en'
                ? isActive
                  ? 'Currently in English'
                  : 'Switch to Bahasa Melayu'
                : isActive
                  ? 'Bahasa Melayu digunakan'
                  : 'Tukar ke Bahasa Inggeris'}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-primary" />
            </span>
            {locale.label}
          </button>
        )
      })}
    </div>
  )
}
