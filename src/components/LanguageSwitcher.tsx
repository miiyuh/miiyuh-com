'use client'

import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { useState, useEffect } from 'react'

const LanguageSwitcher = () => {
  const { i18n: i18nextInstance } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)

  const languages = [
    { code: 'en', name: '🇬🇧 english' },
    { code: 'ms-MY', name: '🇲🇾 bahasa melayu' },
    { code: 'ms-Arab-MY', name: '🇲🇾 jawi' },
    { code: 'ja', name: '🇯🇵 日本語' },
  ]

  useEffect(() => {
    setMounted(true)
    setCurrentLang(i18nextInstance.language)
  }, [i18nextInstance.language])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setCurrentLang(lng)
    setMenuOpen(false) // Close menu after selecting
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#1A1A1A] text-sm font-medium text-[#FAF3E0] hover:bg-[#FAF3E0] hover:text-[#1A1A1A] focus:outline-none"
      >
        🌐 loading...
      </button>
    )
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#1A1A1A] text-sm font-medium text-[#FAF3E0] hover:bg-[#FAF3E0] hover:text-[#1A1A1A] focus:outline-none"
        >
          🌐 {languages.find((l) => l.code === currentLang)?.name}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1A1A] ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="block px-4 py-2 text-sm text-[#FAF3E0] w-full text-left hover:bg-[#FAF3E0] hover:text-[#1A1A1A]"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
