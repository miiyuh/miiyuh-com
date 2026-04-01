import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectsClient from './projects-client'

// ISR: Revalidate every 60 seconds for faster repeat visits
export const revalidate = 60

export async function generateMetadata() {
  return {
    title: 'Projects - miiyuh',
    description: 'Side projects, university work, and research papers — a collection of things I\'ve built and written.',
  }
}

async function ProjectsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 2,
    sort: 'order',
    where: {
      category: {
        not_equals: 'research-paper',
      },
    },
  })

  // Transform projects for client with category-specific fields
  const projects = docs.map((project) => {
    const base = {
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
      order: project.order || 0,
      externalLink: project.externalLink,
    }

    // Add category-specific fields
    if (project.category === 'side-project' && project.projectDetails) {
      const details = project.projectDetails as {
        techStack?: { tech: string }[]
        status?: 'active' | 'in-development' | 'archived'
        githubUrl?: string
        liveUrl?: string
      }
      return {
        ...base,
        projectDetails: {
          techStack: details.techStack,
          status: details.status,
          githubUrl: details.githubUrl,
          liveUrl: details.liveUrl,
        },
      }
    }

    if (project.category === 'university-project' && project.universityDetails) {
      const details = project.universityDetails as {
        course?: string
        semester?: string
        grade?: string
      }
      return {
        ...base,
        universityDetails: {
          course: details.course,
          semester: details.semester,
          grade: details.grade,
        },
      }
    }

    return base
  })

  return <ProjectsClient projects={projects} />
}

export default ProjectsPage
