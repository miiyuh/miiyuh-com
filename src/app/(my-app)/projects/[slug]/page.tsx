import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { RefreshRouteOnSave } from '@/components/live-preview'
import ProjectWrapper from './project-wrapper'

export const revalidate = 60

type PageParams = { slug: string }

type PageProps = {
  params: Promise<PageParams>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = docs[0]
  if (!project) return { title: 'Project Not Found - miiyuh' }

  return {
    title: project.seo?.metaTitle || `${project.name} - Projects - miiyuh`,
    description: project.seo?.metaDescription || project.description,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'projects', limit: 100 })
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  // Transform for client
  const transformedProject = {
    id: String(project.id),
    name: project.name,
    slug: project.slug,
    category: project.category as 'side-project' | 'university-project' | 'research-paper',
    description: project.description,
    icon: project.icon,
    image: project.image
      ? typeof project.image === 'object' && 'url' in project.image
        ? { url: project.image.url, alt: project.image.alt }
        : undefined
      : undefined,
    content: project.content,
    externalLink: project.externalLink,
    // Category-specific
    projectDetails: project.category === 'side-project' && project.projectDetails
      ? {
          techStack: (project.projectDetails as { techStack?: { tech: string }[] }).techStack,
          status: (project.projectDetails as { status?: string }).status as 'active' | 'in-development' | 'archived' | undefined,
          githubUrl: (project.projectDetails as { githubUrl?: string }).githubUrl,
          liveUrl: (project.projectDetails as { liveUrl?: string }).liveUrl,
        }
      : undefined,
    universityDetails: project.category === 'university-project' && project.universityDetails
      ? {
          course: (project.universityDetails as { course?: string }).course,
          semester: (project.universityDetails as { semester?: string }).semester,
          grade: (project.universityDetails as { grade?: string }).grade,
        }
      : undefined,
    paperDetails: project.category === 'research-paper' && project.paperDetails
      ? {
          author: (project.paperDetails as { author?: string }).author,
          year: (project.paperDetails as { year?: string }).year,
          abstract: (project.paperDetails as { abstract?: string }).abstract,
          keywords: (project.paperDetails as { keywords?: { keyword: string }[] }).keywords,
          pages: (project.paperDetails as { pages?: number }).pages,
          pdfFile: (() => {
            const pdfFile = (project.paperDetails as { pdfFile?: { url?: string; filename?: string } | string }).pdfFile
            if (pdfFile && typeof pdfFile === 'object' && 'url' in pdfFile) {
              return { url: pdfFile.url, filename: pdfFile.filename }
            }
            return undefined
          })(),
        }
      : undefined,
  }

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <ProjectWrapper project={transformedProject} />
    </Fragment>
  )
}
