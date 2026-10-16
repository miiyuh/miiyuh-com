import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FontsPage from './dev-fonts-client'

export const metadata: Metadata = { title: 'fonts - dev - miiyuh.com', robots: { index: false } }

// Internal font specimen + diagnostics page — dev only, 404s in production
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <FontsPage />
}
