import { notFound } from 'next/navigation'
import FontDebugPage from './dev-fonts-client'

// Internal font debug page — dev only, 404s in production
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <FontDebugPage />
}
