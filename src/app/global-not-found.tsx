import './(my-app)/globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { AppProvider } from '@/components/layout/app-provider'
import { ErrorScreen } from '@/components/error-screen'
import { LocaleProvider } from '@/lib/locale-context'
import { fontVariables } from '@/lib/fonts'
import { DEFAULT_LOCALE, LOCALE_HEADER, isValidLocale } from '@/lib/locale'

// Served for any URL that matches no route. It bypasses the site layout, so it
// brings its own document, styles and fonts, then reuses the site chrome
// (header + footer) and the shared 404 screen. Rendered fully on the server.
export const metadata: Metadata = {
  title: 'page not found - miiyuh.com',
  description: 'this page does not exist.',
  icons: { icon: '/assets/img/favicons/favicon-32x32.png' },
}

export default async function GlobalNotFound() {
  // Set by src/proxy.ts from the URL (/ms/... -> "ms")
  const headerLocale = (await headers()).get(LOCALE_HEADER) ?? ''
  const locale = isValidLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE

  return (
    <html lang={locale} className="bg-bg-primary text-text-primary">
      <body className={`${fontVariables} antialiased relative flex flex-col min-h-screen`}>
        <LocaleProvider locale={locale}>
          <AppProvider>
            <ErrorScreen kind="not-found" />
          </AppProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
