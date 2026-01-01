'use client'

import Link from 'next/link'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { ArrowRight, ClipboardList, MessageSquare } from 'lucide-react'

interface Survey {
  id: string
  title: string
  slug: string
  fieldCount: number
  createdAt: string
}

interface SurveysClientProps {
  surveys: Survey[]
}

export default function SurveysClient({ surveys }: SurveysClientProps) {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'surveys' },
              ]}
              className="mb-0"
            />
          </div>

          {/* Header Section */}
          <div className="mb-8 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-8 text-text-primary leading-[0.9]">
              surveys
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-light">
              help me understand what matters to you. take a quick survey and share your feedback.
            </p>
          </div>

          {/* Main Content Grid (matching blog layout) */}
          <div className="grid gap-0 md:grid-cols-4">
            {/* Surveys List - 3 columns */}
            <div className="md:col-span-3 order-2 md:order-1">
              {surveys.length > 0 ? (
                <ul className="divide-y divide-white/10">
                  {surveys.map((survey) => (
                    <li key={survey.id}>
                      <Link
                        href={`/surveys/${survey.slug}`}
                        className="group flex flex-col py-6 md:py-8 transition-colors hover:bg-white/5 -mx-4 px-4 rounded-lg"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="shrink-0 p-3 rounded-lg bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                            <ClipboardList className="size-5" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg md:text-xl font-serif font-medium text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                              {survey.title}
                            </h2>
                            <p className="text-sm text-text-muted font-light">
                              {survey.fieldCount} {survey.fieldCount === 1 ? 'question' : 'questions'}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="shrink-0 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all">
                            <ArrowRight className="size-5" />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className=" border-y border-white/10 rounded-lg py-20 text-center">
                  <MessageSquare className="size-12 mx-auto text-text-muted mb-4" />
                  <p className="text-text-muted mb-2 text-xl font-sans font-bold">No surveys available yet.</p>
                  <p className="text-sm text-text-muted/70">Check back soon for new surveys and feedback forms.</p>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <aside className="md:col-span-1 order-1 md:order-2 md:border-l border-white/10">
              <div className="md:sticky md:top-24 space-y-6">
                {/* Info Card */}
                <div className="border-t md:border-b border-white/10 rounded-lg p-0 md:pl-0 pt-4 md:pt-0">
                  <p className="text-sm text-text-muted/80 leading-relaxed mb-4">
                    These are quick forms to gather your thoughts and opinions. Your responses help me understand what you care about and improve future content.
                  </p>
                  <div className="text-sm text-text-muted/80 leading-relaxed mb-4">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-green-500/60"></span>
                      <span>Anonymous responses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-green-500/60"></span>
                      <span>Takes 1-2 minutes</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {surveys.length > 0 && (
                  <div className="md:pl-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-text-primary">{surveys.length}</span>
                      <span className="text-sm text-text-muted">active {surveys.length === 1 ? 'survey' : 'surveys'}</span>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
