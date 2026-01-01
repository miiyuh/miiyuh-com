'use client'

import { GenericLoading } from '@/components/debug/generic-loading'
import { Search, Tag } from 'lucide-react'

export default function BlogLoading() {
  return (
    <GenericLoading
      breadcrumbLabel="blog"
      title="blog"
      showSearch
      showFilters
      searchIcon={Search}
      filterIcon={Tag}
      gridCols={3}
      cardCount={6}
    />
  )
}
