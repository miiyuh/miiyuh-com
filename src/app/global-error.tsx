'use client'

import './(my-app)/globals.css'
import { useEffect } from 'react'
import localFont from 'next/font/local'
import { ErrorScreen } from '@/components/error-screen'

// Replaces the root layout when it fails, so it brings its own document,
// styles and fonts. Locale context is unavailable here; copy falls back to English.
const stackSansText = localFont({
  src: '../assets/fonts/StackSansText-VariableFont_wght.ttf',
  weight: '200 700',
  variable: '--font-stack-sans-text',
})
const stackSansNotch = localFont({
  src: '../assets/fonts/StackSansNotch-VariableFont_wght.ttf',
  weight: '200 700',
  variable: '--font-stack-sans-notch',
})

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en" className="bg-bg-primary text-text-primary">
      <body className={`${stackSansText.variable} ${stackSansNotch.variable} antialiased flex flex-col min-h-screen`}>
        <title>something went wrong - miiyuh.com</title>
        <ErrorScreen kind="error" retry={retry} digest={error.digest} />
      </body>
    </html>
  )
}
