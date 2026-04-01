import { getPayload } from 'payload'
import config from '@payload-config'
import HomeClient from './home-client'
import type { AboutEntry } from '@/types/about'

export const revalidate = 300

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
      education: educationResult.docs as unknown as AboutEntry[],
      experience: experienceResult.docs as unknown as AboutEntry[],
      volunteering: volunteeringResult.docs as unknown as AboutEntry[],
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