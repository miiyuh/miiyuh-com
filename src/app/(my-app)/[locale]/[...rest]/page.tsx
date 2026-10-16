import { notFound } from 'next/navigation'

// Unmatched URLs under a locale render [locale]/not-found.tsx inside the site layout
export default function CatchAll() {
  notFound()
}
