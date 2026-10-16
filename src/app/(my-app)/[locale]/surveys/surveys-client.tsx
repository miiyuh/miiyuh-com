'use client'

import Link from 'next/link'
import { ArrowUpRightIcon, ClipboardTextIcon, ChatCircleDotsIcon } from '@phosphor-icons/react'
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
  estimatedMinutes: number
  createdAt: string
}

interface SurveysClientProps {
  surveys: Survey[]
}

export default function SurveysClient({ surveys }: SurveysClientProps) {
  const haptic = useWebHaptics()

  if (surveys.length === 0) {
    return (
      <div className="border border-dashed border-white/8 rounded-lg py-20 text-center">
        <ChatCircleDotsIcon className="w-12 h-12 mx-auto text-text-muted mb-4" />
        <p className="text-text-muted mb-2">nothing in the tray — check back for new surveys</p>
        <p className="text-sm text-text-muted/60">surveys appear here when they&apos;re ready for responses.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {surveys.map((survey, index) => (
        <Link
          key={survey.id}
          href={`/surveys/${survey.slug}`}
          className="group block content-auto-sm animate-stagger-item"
          style={{ '--i': Math.min(index, 9) } as React.CSSProperties}
          onClick={() => haptic.trigger('medium')}
        >
          <div className="relative flex items-center gap-4 p-5 rounded-lg border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/12 transition-all duration-300">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center group-hover:bg-accent-primary/15 transition-colors">
              <ClipboardTextIcon className="w-5 h-5 text-accent-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-base font-medium text-text-primary transition-colors">
                <span className="text-highlight">{survey.title}</span>
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-text-muted/60">
                  {survey.fieldCount} {survey.fieldCount === 1 ? 'question' : 'questions'}
                </p>
                <span className="text-xs text-text-muted/40">·</span>
                <p className="text-xs text-text-muted/60">
                  ~{survey.estimatedMinutes} min
                </p>
                <span className="text-xs text-text-muted/40">·</span>
                <p className="text-xs text-text-muted/40">
                  {timeAgo(survey.createdAt)}
                </p>
              </div>
            </div>

            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRightIcon className="w-5 h-5 text-text-muted" weight="bold" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
