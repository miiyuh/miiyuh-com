import type { Metadata } from 'next'
import { Suspense } from 'react'
import HomeHero from './home-hero'
import HomeDetailsSection from './home-details-section'
import HomeDetailsSkeleton from './home-details-skeleton'

export const revalidate = 300

const description =
  "Fresh graduate, creative developer, and photographer. Advocating for better policy, governance, and urban life in Malaysia."

export const metadata: Metadata = {
  title: "miiyuh's webpage",
  description,
  alternates: {
    canonical: "https://miiyuh.com",
  },
  openGraph: {
    title: "miiyuh's webpage",
    description,
    url: "https://miiyuh.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "miiyuh's webpage",
    description,
  },
}

export default function HomePage() {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <div className="px-8 md:px-32 lg:px-56 xl:px-80 py-12 flex flex-col gap-16">
        <HomeHero />

        <Suspense fallback={<HomeDetailsSkeleton />}>
          <HomeDetailsSection />
        </Suspense>
      </div>
    </main>
  )
}
