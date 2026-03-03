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
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary">
              surveys
            </h1>
            <p className="text-lg md:text-xl text-text-secondary">
              help me understand what matters to you. take a quick survey and share your feedback.
            </p>
          </div>

          {/* Surveys List */}
          <div>
            {surveys.length > 0 ? (
              <div className="space-y-3">
                {surveys.map((survey) => (
                  <Link
                    key={survey.id}
                    href={`/surveys/${survey.slug}`}
                    className="group block"
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/12 transition-all duration-300">
                      {/* Icon */}
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center group-hover:bg-accent-primary/15 transition-colors">
                        <ClipboardList className="w-5 h-5 text-accent-primary" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                          {survey.title}
                        </h2>
                        <p className="text-xs text-text-muted/60 mt-0.5">
                          {survey.fieldCount} {survey.fieldCount === 1 ? 'question' : 'questions'}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="shrink-0 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-white/8 rounded-lg py-20 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-text-muted mb-4" />
                <p className="text-text-muted mb-2">No surveys available yet.</p>
                <p className="text-sm text-text-muted/60">Check back soon for new surveys and feedback forms.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
