import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Fragment, Suspense } from 'react'
import { RefreshRouteOnSave } from '@/components/live-preview'
import ProjectWrapper from './project-wrapper'
import { ProjectDetailSkeleton } from './project-detail-skeleton'

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
    where: {
      and: [
        { slug: { equals: slug } },
        { category: { not_equals: 'research-paper' } },
      ],
    },
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
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 100,
    where: {
      category: {
        not_equals: 'research-paper',
      },
    },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

async function ProjectPageContent({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      and: [
        { slug: { equals: slug } },
        { category: { not_equals: 'research-paper' } },
      ],
    },
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
    category: project.category as 'side-project' | 'university-project',
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
  }

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <ProjectWrapper project={transformedProject} />
    </Fragment>
  )
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectPageContent params={params} />
    </Suspense>
  )
}
