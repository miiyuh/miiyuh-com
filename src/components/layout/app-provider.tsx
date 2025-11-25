'use client'

import ClientHeader from '@/components/layout/client-header'
import Footer from '@/components/layout/footer'
import ScrollToTopButton from '@/components/ui/scroll-to-top-button'
import { RouteLoadingProvider } from '@/components/layout/route-loading-provider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <RouteLoadingProvider>
      <div className="flex min-h-screen flex-col">
        <ClientHeader />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </RouteLoadingProvider>
  )
}
