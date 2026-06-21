'use client'

import Link from 'next/link'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { ArrowRight, Clipboard, Chat } from '@phosphor-icons/react'
import { useWebHaptics } from 'web-haptics/react'

function timeAgo(dateString: string): string {
  const now = Date.now()
  const then = new Date(dateString).getTime()
  const diffMs = now - then
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

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
  const haptic = useWebHaptics()
  return (
    <main className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative">
      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-24 min-h-[70vh]">
        <div>
          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb items={breadcrumbs.surveys()} />
          

          {/* Header Section */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary text-balance">
              surveys
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty">
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
                    onClick={() => haptic.trigger('medium')}
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-white/8 bg-white/2 shadow-sm hover:bg-white/5 hover:border-white/12 hover:shadow-md transition-all duration-300">
                      {/* Icon */}
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center group-hover:bg-accent-primary/15 transition-colors">
                        <Clipboard className="w-5 h-5 text-accent-primary" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                          {survey.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-text-muted/60">
                            {survey.fieldCount} {survey.fieldCount === 1 ? 'question' : 'questions'}
                          </p>
                          <span className="text-xs text-text-muted/40">·</span>
                          <p className="text-xs text-text-muted/40">
                            {timeAgo(survey.createdAt)}
                          </p>
                        </div>
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
              <div className="border border-dashed border-white/8 rounded-lg py-20 text-center">
                <Chat className="w-12 h-12 mx-auto text-text-muted mb-4" />
                <p className="text-text-muted mb-2">nothing in the tray — check back for new surveys</p>
                <p className="text-sm text-text-muted/60">surveys appear here when they&apos;re ready for responses.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
