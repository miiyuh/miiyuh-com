import { notFound } from 'next/navigation'
import FontTestPage from './font-test-client'

// Internal font specimen page — dev only, 404s in production
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <FontTestPage />
}
