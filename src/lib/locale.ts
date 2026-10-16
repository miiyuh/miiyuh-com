export const AVAILABLE_LOCALES = [
  { code: 'en', label: 'EN', labelFull: 'English' },
  { code: 'ms', label: 'MS', labelFull: 'Malay (Malaysia)' },
] as const

export type LocaleCode = (typeof AVAILABLE_LOCALES)[number]['code']

export const DEFAULT_LOCALE: LocaleCode = 'en'
export const LOCALE_CODES: LocaleCode[] = AVAILABLE_LOCALES.map((l) => l.code)

// Request header set by src/proxy.ts with the URL's locale
export const LOCALE_HEADER = 'x-site-locale'

export function isValidLocale(code: string): code is LocaleCode {
  return AVAILABLE_LOCALES.some((l) => l.code === code)
}

// The default locale lives at the unprefixed URL (/blog); others get a prefix (/ms/blog).
// src/proxy.ts rewrites unprefixed requests to /en/... internally.
export function localizePath(path: string, locale: LocaleCode): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

// Inverse of localizePath: "/ms/blog" -> { locale: "ms", path: "/blog" }
export function splitLocalePath(pathname: string): { locale: LocaleCode; path: string } {
  const [, first, ...rest] = pathname.split('/')
  if (first && isValidLocale(first)) {
    return { locale: first, path: `/${rest.join('/')}` }
  }
  return { locale: DEFAULT_LOCALE, path: pathname }
}

// hreflang alternates for generateMetadata / sitemap
export function localeAlternates(path: string, baseUrl = 'https://miiyuh.com'): Record<LocaleCode, string> {
  return {
    en: `${baseUrl}${localizePath(path, 'en')}`,
    ms: `${baseUrl}${localizePath(path, 'ms')}`,
  }
}

// Per-locale canonical + hreflang links for a page's `alternates` metadata
export function pageAlternates(path: string, locale: LocaleCode, baseUrl = 'https://miiyuh.com') {
  return {
    canonical: `${baseUrl}${localizePath(path, locale)}`,
    languages: localeAlternates(path, baseUrl),
  }
}

// Reads the [locale] route param. The layout already 404s unknown locales,
// so the fallback only matters for type narrowing.
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<LocaleCode> {
  const { locale } = await params
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE
}

// Internal route paths for every locale ("/blog" -> ["/en/blog", "/ms/blog"]).
// revalidatePath needs these, since unprefixed URLs are rewritten to /en/...
export function allLocaleRoutePaths(path: string): string[] {
  return LOCALE_CODES.map((l) => `/${l}${path === '/' ? '' : path}`)
}
