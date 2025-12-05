'use client'

import { GenericLoading } from '@/components/debug/generic-loading'

export default function ProjectDetailLoading() {
  return (
    <GenericLoading
      breadcrumbLabel="projects"
      title="project"
      showSearch={false}
      showFilters={false}
      gridCols={1}
      cardCount={1}
    />
  )
}
