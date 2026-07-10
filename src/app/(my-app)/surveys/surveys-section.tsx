import { getAllForms } from '@/utils/forms'
import { slugify } from '@/utils/slugify'
import SurveysClient from './surveys-client'

export default async function SurveysSection() {
  const forms = await getAllForms()

  const surveys = forms
    .map((form) => {
      const fieldCount = form.fields?.length ?? 0
      return {
        id: form.id,
        title: form.title,
        slug: slugify(form.title),
        fieldCount,
        estimatedMinutes: Math.max(1, Math.ceil(fieldCount / 3)),
        createdAt: form.createdAt,
      }
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return <SurveysClient surveys={surveys} />
}
