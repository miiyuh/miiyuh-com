'use client'

import { memo } from 'react'
import Header from '@/components/layout/header'

const ClientHeader = memo(function ClientHeaderComponent() {
  return (
    <div className="sticky top-0 z-50">
      <Header />
    </div>
  )
})

ClientHeader.displayName = 'ClientHeader'

export default ClientHeader
