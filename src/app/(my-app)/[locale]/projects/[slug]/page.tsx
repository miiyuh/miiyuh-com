import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { unstable_cache } from 'next/cache'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { renderLexicalContent } from '@/utils/lexical-renderer'
import { extractTocFromLexical } from '@/utils/extract-toc'
import { resolveMediaSrc, toJxlSources } from '@/utils/media'
import ProjectDetailClient from './project-detail-client'
import { pageAlternates, resolveLocale, type LocaleCode } from '@/lib/locale'

export const revalidate = 60

type PageParams = { locale: string; slug: string }

type PageProps = {
  params: Promise<PageParams>
}

/**
 * Fetch and cache a single published project by slug.
 * Shared by generateMetadata and the page so notFound() can run before render.
 */
const getCachedProject = unstable_cache(
  async (slug: string, locale: LocaleCode) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      locale,
      where: {
        and: [
          { slug: { equals: slug } },
          { category: { not_equals: 'research-paper' } },
          { _status: { equals: 'published' } },
        ],
      },
      depth: 1,
      limit: 1,
    })
    return docs[0]
  },
  ['project-by-slug'],
  { revalidate: 60, tags: ['projects'] },
)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await resolveLocale(params)

  const project = await getCachedProject(slug, locale)
  if (!project) return { title: 'Project Not Found - miiyuh' }

  const seo = project.seo as
    | {
        metaTitle?: string | null
        metaDescription?: string | null
      }
    | undefined

  return {
    title: seo?.metaTitle || `${project.name} - Projects - miiyuh`,
    alternates: pageAlternates(`/projects/${slug}`, locale),
    description:
      seo?.metaDescription ||
      (typeof project.description === 'string' ? project.description : undefined),
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 200,
    where: {
      and: [
        { category: { not_equals: 'research-paper' } },
        { _status: { equals: 'published' } },
      ],
    },
    select: {
      slug: true,
    },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

// notFound() must run before any Suspense boundary renders, otherwise the
// response streams with a committed 200 status instead of a real 404.
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const locale = await resolveLocale(params)

  const project = await getCachedProject(slug, locale)
  if (!project) notFound()

  // Transform for client
  const transformedProject = {
    id: String(project.id),
    name: project.name,
    slug: project.slug,
    category: project.category as 'side-project' | 'university-project',
    description: project.description,
    // `resolveMediaSrc` strips the origin off Payload's absolute media URLs and
    // prefers R2 when configured — next/image rejects absolute same-origin URLs
    // with `"url" parameter is not allowed`. Blog, gallery and home already use it.
    icon:
      typeof project.icon === 'object' && project.icon
        ? resolveMediaSrc({ url: project.icon.url, filename: project.icon.filename })
        : undefined,
    iconJxl:
      typeof project.icon === 'object' && project.icon ? toJxlSources(project.icon) : undefined,
    image:
      typeof project.image === 'object' && project.image
        ? {
            url: resolveMediaSrc({ url: project.image.url, filename: project.image.filename }),
            alt: project.image.alt,
            jxl: toJxlSources(project.image),
          }
        : undefined,
    htmlContent: renderLexicalContent(project.content ?? null),
    toc: extractTocFromLexical(project.content),
    externalLink: project.externalLink ?? undefined,
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
      <ProjectDetailClient project={transformedProject} />
    </Fragment>
  )
}
