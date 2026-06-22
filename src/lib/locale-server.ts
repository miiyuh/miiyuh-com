import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, type LocaleCode } from './locale'

export async function getServerLocale(): Promise<LocaleCode> {
  try {
    const cookieStore = await cookies()
    const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value
    if (localeCookie === 'en' || localeCookie === 'ms') {
      return localeCookie
    }
  } catch {
    // cookies() may throw during build/static generation
  }
  return DEFAULT_LOCALE
}
