'use client'

import ClientHeader from '@/components/layout/client-header'
import Footer from '@/components/layout/footer'
import ScrollToTopButton from '@/components/ui/scroll-to-top-button'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ClientHeader />
      <div className="flex flex-1 flex-col">
        {children}
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
