import { getPayload } from 'payload'
import config from '@payload-config'
import HomeClient from './home-client'
import type { AboutEntry } from '@/types/about'

export const revalidate = 60

async function getAboutData(): Promise<{
  education: AboutEntry[]
  experience: AboutEntry[]
  volunteering: AboutEntry[]
}> {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'about-entries',
      limit: 100,
      sort: 'order',
    })

    const entries = docs as unknown as AboutEntry[]

    return {
      education: entries.filter((e) => e.type === 'education').sort((a, b) => (a.order || 0) - (b.order || 0)),
      experience: entries.filter((e) => e.type === 'experience').sort((a, b) => (a.order || 0) - (b.order || 0)),
      volunteering: entries.filter((e) => e.type === 'volunteering').sort((a, b) => (a.order || 0) - (b.order || 0)),
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