import { getPayload } from 'payload'
import config from '@payload-config'
import HomeDetails from './home-details'
import type { AboutEntry } from '@/types/about'
import type { AboutEntry as AboutEntryDoc, Media } from '@payload-types'
import type { LexicalContent } from '@/utils/lexical-renderer'
import { resolveMediaSrc } from '@/utils/media'
import { resolveLocale, type LocaleCode } from '@/lib/locale'

const mapAboutEntries = (docs: AboutEntryDoc[]): AboutEntry[] => {
  return docs.map((entry) => {
    const rawLogo = entry.logo && typeof entry.logo === 'object' ? entry.logo : null
    const logoSrc = rawLogo
      ? resolveMediaSrc({
          url: rawLogo.url,
          filename: rawLogo.filename,
        })
      : undefined

    return {
      id: String(entry.id),
      type: entry.type ?? 'experience',
      title: entry.title ?? '',
      subtitle: entry.subtitle ?? undefined,
      description: entry.description != null ? (entry.description as LexicalContent) : undefined,
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
    }
  })
}

async function getAboutData(locale: LocaleCode): Promise<{
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
        locale,
        where: { type: { equals: 'education' } },
        depth: 1,
        limit: 100,
        sort: '_order',
      }),
      payload.find({
        collection: 'about-entries',
        locale,
        where: { type: { equals: 'experience' } },
        depth: 1,
        limit: 100,
        sort: '_order',
      }),
      payload.find({
        collection: 'about-entries',
        locale,
        where: { type: { equals: 'volunteering' } },
        depth: 1,
        limit: 100,
        sort: '_order',
      }),
    ])

    return {
      education: mapAboutEntries(educationResult.docs),
      experience: mapAboutEntries(experienceResult.docs),
      volunteering: mapAboutEntries(volunteeringResult.docs),
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

async function getResumeData(locale: LocaleCode): Promise<{
  pdfUrl?: string
  title: string
  filename?: string
  filesize?: number
} | null> {
  try {
    const payload = await getPayload({ config })
    const resume = await payload.findGlobal({ slug: 'resume', locale, depth: 1 })
    const pdf: Media | string | null | undefined = resume.pdf
    const pdfUrl =
      pdf && typeof pdf === 'object'
        ? resolveMediaSrc({ url: pdf.url, filename: pdf.filename })
        : undefined
    return {
      pdfUrl,
      title: resume.title || 'resume',
      filename: pdf && typeof pdf === 'object' ? (pdf.filename ?? undefined) : undefined,
      filesize: pdf && typeof pdf === 'object' ? (pdf.filesize ?? undefined) : undefined,
    }
  } catch (error) {
    console.error('Failed to fetch resume data:', error)
    return null
  }
}

export default async function HomeDetailsSection({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const [aboutData, resumeData] = await Promise.all([
    getAboutData(locale),
    getResumeData(locale),
  ])

  return (
    <HomeDetails
      education={aboutData.education}
      experience={aboutData.experience}
      volunteering={aboutData.volunteering}
      resumePdfUrl={resumeData?.pdfUrl}
      resumeFilename={resumeData?.filename}
      resumeFilesize={resumeData?.filesize}
    />
  )
}
