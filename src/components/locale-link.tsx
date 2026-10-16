'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { localizePath } from '@/lib/locale'
import { useLocale } from '@/lib/locale-context'

// next/link that keeps the visitor in their locale: "/blog" becomes "/ms/blog"
// on Malay pages. Only site-relative string hrefs are rewritten.
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = useLocale()
  const localized =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
      ? localizePath(href, locale)
      : href
  return <Link href={localized} {...props} />
}
