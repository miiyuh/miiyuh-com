'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import ClientHeader from '@/components/layout/client-header'

const Footer = dynamic(() => import('@/components/layout/footer'), { ssr: false })
const ScrollToTopButton = dynamic(() => import('@/components/ui/scroll-to-top-button'), { ssr: false })

export function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

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
