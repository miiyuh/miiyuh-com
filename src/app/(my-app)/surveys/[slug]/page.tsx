import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { FormBlockServer } from '@/components/forms/form-block'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { getAllForms } from '@/utils/forms'
import { ArrowLeft, Clock, HelpCircle } from 'lucide-react'

type SurveyPageProps = {
  params: Promise<{
    slug: string
  }>
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function generateMetadata({
  params,
}: SurveyPageProps): Promise<Metadata> {
  const { slug } = await params
  const forms = await getAllForms()
  const form = forms.find((f) => generateSlug(f.title) === slug)

  if (!form) {
    return { title: 'Survey Not Found - miiyuh' }
  }

  return {
    title: `${form.title} - miiyuh`,
    description: `share your thoughts on ${form.title.toLowerCase()}.`,
  }
}

export default async function SurveyPage({ params }: SurveyPageProps) {
  const { slug } = await params
  const forms = await getAllForms()
  const form = forms.find((f) => generateSlug(f.title) === slug)

  if (!form) {
    notFound()
  }

  const fieldCount = form.fields?.length || 0

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      {/* Live Preview - refreshes page when survey is saved in admin */}
      <RefreshRouteOnSave />
      
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'surveys', href: '/surveys' },
                { label: slug },
              ]}
              className="mb-0"
            />
          </div>

          {/* Header Section */}
          <div className="mb-12 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary leading-[0.9]">
              {form.title}.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-light mb-6">
              take a moment to share your thoughts. your feedback helps shape future content.
            </p>
            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="size-4" />
                <span>{fieldCount} {fieldCount === 1 ? 'question' : 'questions'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>~{Math.max(1, Math.ceil(fieldCount / 3))} min</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-4">
            {/* Form - 3 columns */}
            <div className="md:col-span-3 order-2 md:order-1">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
                <FormBlockServer form={form} />
              </div>

              {/* Back Link */}
              <Link
                href="/surveys"
                className="inline-flex items-center gap-2 mt-8 text-sm text-text-muted hover:text-text-primary transition-colors group"
              >
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                <span>back to all surveys</span>
              </Link>
            </div>

            {/* Sidebar - 1 column */}
            <aside className="md:col-span-1 order-1 md:order-2 md:border-l border-white/10">
              <div className="md:sticky md:top-24 space-y-6">
                <div className="border-t md:border-b border-white/10 rounded-lg p-0 md:pl-6 pt-4 md:pt-0">
                  <h3 className="text-lg font-serif font-medium text-text-muted mb-3">
                    Before You Start
                  </h3>
                  <ul className="space-y-3 text-sm text-text-muted/80 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 mt-2 rounded-full bg-green-500/60 shrink-0"></span>
                      <span>All responses are anonymous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 mt-2 rounded-full bg-green-500/60 shrink-0"></span>
                      <span>There are no right or wrong answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 mt-2 rounded-full bg-green-500/60 shrink-0"></span>
                      <span>Your input is genuinely appreciated</span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
