'use client'

import { usePathname } from 'next/navigation'
import { InteractiveGridBackground } from '@/components/effects/interactive-grid-background'

export function ClientGridBackground() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  return <InteractiveGridBackground belowHeader={!isHomePage} />
}
