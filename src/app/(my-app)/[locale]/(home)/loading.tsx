import HomeHero from './home-hero'
import HomeDetailsSkeleton from './home-details-skeleton'

export default function HomeLoading() {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <div className="px-8 md:px-32 lg:px-56 xl:px-80 py-12 flex flex-col gap-16">
        <HomeHero />
        <HomeDetailsSkeleton />
      </div>
    </main>
  )
}
