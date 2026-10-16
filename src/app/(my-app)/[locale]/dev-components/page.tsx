import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ComponentsLabPage from './dev-components-client'

export const metadata: Metadata = { title: 'components - dev - miiyuh.com', robots: { index: false } }

// Internal component lab — dev only, 404s in production
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <ComponentsLabPage />
}
