import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { FormBlockServer } from '@/components/forms/form-block'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { SurveySkeleton } from './survey-skeleton'
import { getAllForms } from '@/utils/forms'
import { slugify } from '@/utils/slugify'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft'
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock'
import { Question } from '@phosphor-icons/react/dist/ssr/Question'

type SurveyPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: SurveyPageProps): Promise<Metadata> {
  const { slug } = await params
  const forms = await getAllForms()
  const form = forms.find((f) => slugify(f.title) === slug)

  if (!form) {
    return { title: 'Survey Not Found - miiyuh' }
  }

  return {
    title: `${form.title} - miiyuh`,
    description: `share your thoughts on ${form.title.toLowerCase()}.`,
  }
}

async function SurveyPageContent({ params }: SurveyPageProps) {
  const { slug } = await params
  const forms = await getAllForms()
  const form = forms.find((f) => slugify(f.title) === slug)

  if (!form) {
    notFound()
  }

  const fieldCount = form.fields?.length || 0

  return (
    <main className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative">
      {/* Live Preview - refreshes page when survey is saved in admin */}
      <RefreshRouteOnSave />

      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-24 min-h-[70vh]">
        <div>
          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb items={breadcrumbs.surveyDetail(slug)} />
          

          {/* Header Section */}
          <div className="mb-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-6 text-text-primary text-balance leading-tight">
              {form.title}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl text-pretty mb-6">
              take a moment to share your thoughts. your feedback helps shape future content.
            </p>
            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-1.5">
                <Question className="size-4" />
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
              <div className="rounded-xl border border-white/8 bg-white/4 shadow-sm p-6 sm:p-8">
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
            <aside className="md:col-span-1 order-1 md:order-2 md:border-l border-white/8">
              <div className="md:sticky md:top-24 space-y-6">
                <div className="border-t md:border-b border-white/8 rounded-lg p-0 md:pl-6 pt-4 md:pt-0">
                  <h3 className="text-lg font-serif font-medium text-text-muted mb-3">
                    Before You Start
                  </h3>
                  <ul className="space-y-3 text-sm text-text-muted/80 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 mt-2 rounded-full bg-accent-primary/60 shrink-0"></span>
                      <span>All responses are anonymous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 mt-2 rounded-full bg-accent-primary/60 shrink-0"></span>
                      <span>There are no right or wrong answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 mt-2 rounded-full bg-accent-primary/60 shrink-0"></span>
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

export default function SurveyPage({ params }: SurveyPageProps) {
  return (
    <Suspense fallback={<SurveySkeleton />}>
      <SurveyPageContent params={params} />
    </Suspense>
  )
}
