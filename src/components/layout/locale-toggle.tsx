'use client'

import { useCallback } from 'react'
import {
  AVAILABLE_LOCALES,
  LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_MAX_AGE,
  type LocaleCode,
} from '@/lib/locale'
import { useLocale } from '@/lib/locale-context'

export default function LocaleToggle() {
  const currentLocale = useLocale()

  const setLocale = useCallback((code: LocaleCode) => {
    document.cookie = `${LOCALE_COOKIE_NAME}=${code}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`
    window.location.reload()
  }, [])

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 text-xs font-sans tracking-wide">
      {AVAILABLE_LOCALES.map((locale) => {
        const isActive = currentLocale === locale.code

        return (
          <button
            key={locale.code}
            onClick={() => setLocale(locale.code)}
            className={`group relative px-2.5 py-1.5 transition-all duration-200 first:rounded-l-full last:rounded-r-full cursor-pointer ${
              isActive
                ? 'bg-[#FAF3E0] text-black font-medium'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-primary/80 hover:backdrop-blur-xl'
            }`}
            aria-label={`Switch to ${locale.labelFull}`}
            aria-pressed={isActive}
          >
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-[#FAF3E0] text-[#070707] text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {currentLocale === 'en'
                ? isActive
                  ? 'Currently in English'
                  : 'Switch to Bahasa Melayu'
                : isActive
                  ? 'Bahasa Melayu digunakan'
                  : 'Tukar ke Bahasa Inggeris'}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#FAF3E0]" />
            </span>
            {locale.label}
          </button>
        )
      })}
    </div>
  )
}
