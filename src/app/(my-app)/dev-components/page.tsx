import { notFound } from 'next/navigation'
import ComponentsLabPage from './dev-components-client'

// Internal component lab — dev only, 404s in production
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <ComponentsLabPage />
}
