'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Dynamic import to avoid DOMMatrix SSG issue from react-pdf
const ProjectDetailClient = dynamic(() => import('./project-detail-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  ),
})

interface ProjectWrapperProps {
  project: {
    id: string
    name: string
    slug: string
    category: 'side-project' | 'university-project' | 'research-paper'
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
    paperDetails?: {
      author?: string
      year?: string
      abstract?: string
      keywords?: { keyword: string }[]
      pages?: number
      pdfFile?: {
        url?: string
        filename?: string
      }
    }
  }
}

export default function ProjectWrapper({ project }: ProjectWrapperProps) {
  return <ProjectDetailClient project={project} />
}
