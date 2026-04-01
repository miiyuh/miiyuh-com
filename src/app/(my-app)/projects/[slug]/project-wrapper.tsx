'use client'

import dynamic from 'next/dynamic'
import { Spinner } from '@phosphor-icons/react'

// Dynamic import to avoid DOMMatrix SSG issue from react-pdf
const ProjectDetailClient = dynamic(() => import('./project-detail-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner weight="bold" className="size-8 animate-spin text-muted-foreground" />
    </div>
  ),
})

interface ProjectWrapperProps {
  project: {
    id: string
    name: string
    slug: string
    category: 'side-project' | 'university-project'
    description: string
    icon?: string
    image?: {
      url?: string
      alt?: string
    }
    content?: unknown
    externalLink?: string
    projectDetails?: {
      techStack?: { tech: string }[]
      status?: 'active' | 'in-development' | 'archived'
      githubUrl?: string
      liveUrl?: string
    }
    universityDetails?: {
      course?: string
      semester?: string
      grade?: string
    }
  }
}

export default function ProjectWrapper({ project }: ProjectWrapperProps) {
  return <ProjectDetailClient project={project} />
}
