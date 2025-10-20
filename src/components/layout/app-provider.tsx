'use client'

import ClientHeader from '@/components/layout/client-header'
import Footer from '@/components/layout/footer'
import ScrollToTopButton from '@/components/ui/scroll-to-top-button'
import { CustomCursor } from '@/components/ui/custom-cursor'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTopButton />
      <CustomCursor />
    </>
  )
}
