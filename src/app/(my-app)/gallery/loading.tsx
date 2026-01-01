'use client'

import { GenericLoading } from '@/components/debug/generic-loading'

export default function GalleryLoading() {
  return (
    <GenericLoading
      breadcrumbLabel="gallery"
      title="gallery"
      showSearch={false}
      showFilters={false}
      gridCols={3}
      cardCount={6}
    />
  )
}
