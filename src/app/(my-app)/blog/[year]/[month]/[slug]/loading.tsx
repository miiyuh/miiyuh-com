'use client'

import { GenericLoading } from '@/components/debug/generic-loading'

export default function BlogPostLoading() {
  return (
    <GenericLoading
      breadcrumbLabel="blog"
      title="post"
      showSearch={false}
      showFilters={false}
      gridCols={1}
      cardCount={1}
    />
  )
}
