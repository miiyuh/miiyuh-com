import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectsClient from './projects-client'

export const dynamic = 'force-dynamic'

async function generateMetadata() {
  return {
    title: 'Projects - miiyuh',
    description: 'Creative organizations and the projects that live under them. Each represents a different focus area or creative endeavor.',
  }
}

async function ProjectsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    sort: 'order',
  })

  // Transform projects for client
  const projects = docs.map((project) => ({
    id: String(project.id),
    name: project.name,
    slug: project.slug,
    category: project.category,
    description: project.description,
    icon: project.icon,
    image: project.image
      ? typeof project.image === 'object' && 'url' in project.image
        ? { url: project.image.url, alt: project.image.alt }
        : undefined
      : undefined,
    order: project.order || 0,
    externalLink: project.externalLink,
  }))

  return <ProjectsClient projects={projects} />
}

export default ProjectsPage
