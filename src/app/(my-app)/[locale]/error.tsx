'use client'

import { useEffect } from 'react'
import { ErrorScreen } from '@/components/error-screen'

// Catches errors in any page under the site layout (header/footer stay intact)
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorScreen kind="error" retry={retry} digest={error.digest} />
}
