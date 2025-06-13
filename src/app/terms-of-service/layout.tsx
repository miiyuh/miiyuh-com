import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'terms of service | miiyuh',
  description: 'comprehensive terms of service for miiyuh.com outlining usage terms and conditions',
  openGraph: {
    title: 'terms of service | miiyuh',
    description: 'comprehensive terms of service for miiyuh.com outlining usage terms and conditions',
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
