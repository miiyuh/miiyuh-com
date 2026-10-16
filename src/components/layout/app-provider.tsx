'use client'

import dynamic from 'next/dynamic'
import ClientHeader from '@/components/layout/client-header'
import Footer from '@/components/layout/footer'
import { SoundProvider } from '@/components/layout/sound-provider'

const ScrollToTopButton = dynamic(() => import('@/components/ui/scroll-to-top-button'), { ssr: false })

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <div className="flex min-h-screen flex-col">
        <ClientHeader />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </SoundProvider>
  )
}
