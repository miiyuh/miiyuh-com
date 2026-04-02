import { getPayload } from 'payload'
import config from '@payload-config'
import HomeClient from './home-client'
import type { AboutEntry } from '@/types/about'
import { resolveMediaSrc } from '@/utils/media'

export const revalidate = 300

type RawAboutLogo = {
  id?: string | number
  url?: string | null
  filename?: string | null
  alt?: string | null
  sizes?: {
    thumbnail?: {
      url?: string | null
      filename?: string | null
    }
  }
}

type RawAboutEntry = {
  id: string | number
  type?: 'education' | 'experience' | 'volunteering'
  title?: string
  subtitle?: string | null
  description?: string | null
  logo?: RawAboutLogo | string | null
  startDate?: string | null
  endDate?: string | null
  isCurrent?: boolean | null
  tags?: Array<{ tag?: string | null }> | null
  link?: string | null
  order?: number | null
}

const mapAboutEntries = (docs: RawAboutEntry[]): AboutEntry[] => {
  return docs.map((entry) => {
    const rawLogo = entry.logo && typeof entry.logo === 'object' ? entry.logo : null
    const thumbnail = rawLogo?.sizes?.thumbnail
    const logoSrc = rawLogo
      ? resolveMediaSrc({
          url: thumbnail?.url ?? rawLogo.url,
          filename: thumbnail?.filename ?? rawLogo.filename,
        })
      : undefined

    return {
      id: String(entry.id),
      type: entry.type ?? 'experience',
      title: entry.title ?? '',
      subtitle: entry.subtitle ?? undefined,
      description: entry.description ?? undefined,
      logo: logoSrc
        ? {
            id: String(rawLogo?.id ?? ''),
            url: logoSrc,
            alt: rawLogo?.alt ?? undefined,
          }
        : undefined,
      startDate: entry.startDate ?? undefined,
      endDate: entry.endDate ?? undefined,
      isCurrent: entry.isCurrent ?? false,
      tags: entry.tags?.filter((tag) => tag?.tag).map((tag) => ({ tag: tag.tag as string })) ?? [],
      link: entry.link ?? undefined,
      order: entry.order ?? 0,
    }
  })
}

async function getAboutData(): Promise<{
  education: AboutEntry[]
  experience: AboutEntry[]
  volunteering: AboutEntry[]
}> {
  try {
    const payload = await getPayload({ config })

    // Fetch each category separately at DB level instead of fetching all and filtering in JS
    const [educationResult, experienceResult, volunteeringResult] = await Promise.all([
      payload.find({
        collection: 'about-entries',
        where: { type: { equals: 'education' } },
        depth: 1,
        limit: 100,
        sort: 'order',
      }),
      payload.find({
        collection: 'about-entries',
        where: { type: { equals: 'experience' } },
        depth: 1,
        limit: 100,
        sort: 'order',
      }),
      payload.find({
        collection: 'about-entries',
        where: { type: { equals: 'volunteering' } },
        depth: 1,
        limit: 100,
        sort: 'order',
      }),
    ])

    return {
      education: mapAboutEntries(educationResult.docs as unknown as RawAboutEntry[]),
      experience: mapAboutEntries(experienceResult.docs as unknown as RawAboutEntry[]),
      volunteering: mapAboutEntries(volunteeringResult.docs as unknown as RawAboutEntry[]),
    }
  } catch (error) {
    console.error('Failed to fetch about data:', error)
    return {
      education: [],
      experience: [],
      volunteering: [],
    }
  }
}

export default async function HomePage() {
  const { education, experience, volunteering } = await getAboutData()

  return (
    <HomeClient
      education={education}
      experience={experience}
      volunteering={volunteering}
    />
  )
}