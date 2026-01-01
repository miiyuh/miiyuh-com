'use client'

import { GenericLoading } from '@/components/debug/generic-loading'

export default function AlbumLoading() {
  return (
    <GenericLoading
      breadcrumbLabel="gallery"
      title="album"
      showSearch={false}
      showFilters={false}
      gridCols={4}
      cardCount={12}
    />
  )
}
