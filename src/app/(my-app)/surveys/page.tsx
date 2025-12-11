import type { Metadata } from 'next'
import { getAllForms } from '@/utils/forms'
import SurveysClient from './surveys-client'

export const metadata: Metadata = {
  title: 'surveys - miiyuh',
  description: 'quick polls and feedback forms to share your thoughts and help improve things.',
}

export const revalidate = 60 // Revalidate every minute

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default async function SurveysPage() {
  const forms = await getAllForms()

  // Transform forms for the client component
  const surveys = forms.map((form) => ({
    id: form.id,
    title: form.title,
    slug: generateSlug(form.title),
    fieldCount: form.fields?.length || 0,
    createdAt: form.createdAt,
  }))

  return <SurveysClient surveys={surveys} />
}
