import type { Metadata } from 'next'
import { getAllForms } from '@/utils/forms'
import { slugify } from '@/utils/slugify'
import SurveysClient from './surveys-client'

export const metadata: Metadata = {
  title: 'surveys - miiyuh.com',
  description: 'quick polls and feedback forms. share your thoughts on various topics and help shape future content.',
}

export const revalidate = 60 // Revalidate every minute

export default async function SurveysPage() {
  const forms = await getAllForms()

  // Transform forms for the client component
  const surveys = forms.map((form) => ({
    id: form.id,
    title: form.title,
    slug: slugify(form.title),
    fieldCount: form.fields?.length || 0,
    createdAt: form.createdAt,
  }))

  return <SurveysClient surveys={surveys} />
}
