import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'privacy policy | miiyuh',
  description: 'comprehensive privacy policy for miiyuh.com detailing data collection and usage practices',
  openGraph: {
    title: 'privacy policy | miiyuh',
    description: 'comprehensive privacy policy for miiyuh.com detailing data collection and usage practices',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
