export const AVAILABLE_LOCALES = [
  { code: 'en', label: 'EN', labelFull: 'English' },
  { code: 'ms', label: 'MS', labelFull: 'Malay (Malaysia)' },
] as const

export type LocaleCode = (typeof AVAILABLE_LOCALES)[number]['code']

export const DEFAULT_LOCALE: LocaleCode = 'en'
export const LOCALE_COOKIE_NAME = 'locale'
export const LOCALE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year

export function isValidLocale(code: string): code is LocaleCode {
  return AVAILABLE_LOCALES.some((l) => l.code === code)
}
