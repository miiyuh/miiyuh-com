'use client'

import { GenericLoading } from '@/components/debug/generic-loading'

export default function ProjectsLoading() {
  return (
    <GenericLoading
      breadcrumbLabel="projects"
      title="projects"
      showSearch={false}
      showFilters={false}
      gridCols={3}
      cardCount={6}
    />
  )
}
