'use client'

import dynamic from 'next/dynamic'
import ClientHeader from '@/components/layout/client-header'

const Footer = dynamic(() => import('@/components/layout/footer'), { ssr: false })
const ScrollToTopButton = dynamic(() => import('@/components/ui/scroll-to-top-button'), { ssr: false })

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
