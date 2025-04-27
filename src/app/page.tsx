'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

// Lazy load i18n only on client
const loadI18n = async () => {
  if (typeof window !== 'undefined') {
    await import('../i18n')
  }
}
loadI18n()

import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col min-h-screen text-[#FAF3E0] bg-[#1A1A1A] font-sans relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <main className="flex-grow flex flex-col justify-center items-center">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/assets/img/logo_miiyuh_text_white_v2.png"
            alt="miiyuh logo"
            width={320}
            height={80}
            className="mx-auto w-80"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Link href="/aboutme" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
            {t('about')}
          </Link>
          <Link href="/socials" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
            {t('socials')}
          </Link>
          <Link href="/gallery" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
            {t('gallery')}
          </Link>
          <Link href="/blog" className="text-3xl font-bold lowercase tracking-tighter hover:scale-110 transition-transform duration-300">
            {t('blog')}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-[#FAF3E0]/70 py-6">
        <p>© 2025 miiyuh 🍁 | made in malaysia! 🇲🇾</p>
      </footer>
    </div>
  )
}
