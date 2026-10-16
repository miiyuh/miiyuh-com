import type { LocaleCode } from '@/lib/locale'

// "16 October 2026" / "16 Oktober 2026", always in Malaysia time
export function formatPostDate(date: string | Date, locale: LocaleCode): string {
  return new Date(date).toLocaleDateString(locale === 'ms' ? 'ms-MY' : 'en-GB', {
    timeZone: 'Asia/Kuala_Lumpur',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
