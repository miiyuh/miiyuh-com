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
    <div className="inline-flex items-center rounded-full overflow-hidden border border-white/10 text-xs font-sans tracking-wide">
      {AVAILABLE_LOCALES.map((locale) => {
        const isActive = currentLocale === locale.code

        return (
          <button
            key={locale.code}
            onClick={() => setLocale(locale.code)}
            className={`px-2.5 py-1.5 transition-all duration-200 first:rounded-l-full last:rounded-r-full ${
              isActive
                ? 'bg-[#FAF3E0] text-black font-medium'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-primary/80 hover:backdrop-blur-xl'
            }`}
            aria-label={`Switch to ${locale.labelFull}`}
            aria-pressed={isActive}
          >
            {locale.label}
          </button>
        )
      })}
    </div>
  )
}
