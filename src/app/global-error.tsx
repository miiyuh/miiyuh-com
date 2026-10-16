'use client'

import './(my-app)/globals.css'
import { useEffect } from 'react'
import { ErrorScreen } from '@/components/error-screen'
import { fontVariables } from '@/lib/fonts'

// Replaces the root layout when it fails, so it brings its own document,
// styles and fonts. Locale context is unavailable here; copy falls back to English.
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
      <body className={`${fontVariables} antialiased flex flex-col min-h-screen`}>
        <title>something went wrong - miiyuh.com</title>
        <ErrorScreen kind="error" retry={retry} digest={error.digest} />
      </body>
    </html>
  )
}
