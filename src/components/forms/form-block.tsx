'use client'

import { useEffect, useState } from 'react'
import { FormRenderer } from './form-renderer'
import { Loader2 } from 'lucide-react'
import type { FormDocument } from '@/types/forms'
import { cn } from '@/lib/utils'

type FormBlockProps = {
  /** Form ID or title to fetch */
  formId: string
  className?: string
  introContent?: React.ReactNode
}

/**
 * FormBlock
 *
 * A wrapper component that fetches a form from the API and renders it.
 * Accepts either a form ID or title for lookup.
 */
export function FormBlock({ formId, className, introContent }: FormBlockProps) {
  const [form, setForm] = useState<FormDocument | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchForm() {
      try {
        // First try fetching by ID
        let response = await fetch(`/api/forms/${formId}`)

        // If not found by ID, try fetching by title
        if (!response.ok) {
          response = await fetch(
            `/api/forms?where[title][equals]=${encodeURIComponent(formId)}&limit=1`
          )
          if (response.ok) {
            const data = await response.json()
            if (data.docs?.[0]) {
              setForm(data.docs[0])
              return
            }
          }
          throw new Error('Form not found')
        }

        const data = await response.json()
        setForm(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load form')
      } finally {
        setIsLoading(false)
      }
    }

    fetchForm()
  }, [formId])

  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <Loader2 className="size-8 animate-spin text-white/50" />
      </div>
    )
  }

  if (error || !form) {
    return (
      <div
        className={cn(
          'rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center',
          className
        )}
      >
        <p className="text-red-300">{error || 'Form not found'}</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {introContent && <div className="text-white/80">{introContent}</div>}
      <FormRenderer form={form} />
    </div>
  )
}

// Server-side pre-loaded form variant
type FormBlockServerProps = {
  form: FormDocument
  className?: string
  introContent?: React.ReactNode
}

/**
 * FormBlockServer
 *
 * A variant that accepts a pre-fetched form document.
 * Use this when you've already fetched the form on the server.
 */
export function FormBlockServer({
  form,
  className,
  introContent,
}: FormBlockServerProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {introContent && <div className="text-white/80">{introContent}</div>}
      <FormRenderer form={form} />
    </div>
  )
}

export default FormBlock
