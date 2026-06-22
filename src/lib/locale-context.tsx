'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { DEFAULT_LOCALE, type LocaleCode } from './locale'

const LocaleContext = createContext<LocaleCode>(DEFAULT_LOCALE)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: LocaleCode
  children: ReactNode
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleCode {
  return useContext(LocaleContext)
}
