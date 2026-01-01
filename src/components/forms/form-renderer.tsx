'use client'

import { useState, useCallback, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
  createListCollection,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react'
import type {
  FormDocument,
  FormField,
  FormValues,
  FormState,
  FormSubmitResponse,
} from '@/types/forms'

type FormRendererProps = {
  form: FormDocument
  className?: string
  onSuccess?: (response: FormSubmitResponse) => void
  onError?: (error: string) => void
}

/**
 * FormRenderer
 *
 * A dynamic form renderer that takes a Payload CMS form document
 * and renders all fields with proper styling and validation.
 */
export function FormRenderer({
  form,
  className,
  onSuccess,
  onError,
}: FormRendererProps) {
  const [values, setValues] = useState<FormValues>(() => {
    // Initialize default values from form fields
    const defaults: FormValues = {}
    form.fields?.forEach((field) => {
      if (field.blockType === 'message') return
      if ('name' in field && field.name) {
        if (field.blockType === 'checkbox') {
          defaults[field.name] = field.defaultValue ?? false
        } else {
          defaults[field.name] = field.defaultValue ?? ''
        }
      }
    })
    return defaults
  })

  const [state, setState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  })

  const handleChange = useCallback(
    (name: string, value: string | boolean | number) => {
      setValues((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setState({ isSubmitting: true, isSuccess: false, error: null })

      try {
        // Build submission data
        const submissionData = Object.entries(values).map(([field, value]) => ({
          field,
          value: String(value),
        }))

        const response = await fetch('/api/form-submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: form.id,
            submissionData,
          }),
        })

        const result: FormSubmitResponse = await response.json()

        if (!response.ok) {
          const errorMessage =
            result.errors?.[0]?.message || 'Failed to submit form'
          setState({ isSubmitting: false, isSuccess: false, error: errorMessage })
          onError?.(errorMessage)
          return
        }

        setState({ isSubmitting: false, isSuccess: true, error: null })
        onSuccess?.(result)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred'
        setState({ isSubmitting: false, isSuccess: false, error: errorMessage })
        onError?.(errorMessage)
      }
    },
    [form.id, values, onSuccess, onError]
  )

  // Success state
  if (state.isSuccess) {
    return (
      <div
        className={cn(
          'rounded-xl border border-green-500/20 bg-green-500/5 p-8 text-center backdrop-blur-md',
          className
        )}
      >
        <CheckCircle2 className="mx-auto mb-4 size-12 text-green-400" />
        <h3 className="mb-2 text-xl font-medium text-white">Thank You!</h3>
        <p className="text-white/70">
          Your submission has been received successfully.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Error Alert */}
      {state.error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-md">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
          <p className="text-sm text-red-300">{state.error}</p>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid gap-6">
        {form.fields?.map((field) => (
          <FormFieldRenderer
            key={field.id || ('name' in field ? field.name : field.blockType)}
            field={field}
            value={
              'name' in field && field.name ? values[field.name] : undefined
            }
            onChange={handleChange}
            disabled={state.isSubmitting}
          />
        ))}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={state.isSubmitting}
        className="w-full sm:w-auto"
      >
        {state.isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-4" />
            {form.submitButtonLabel || 'Submit'}
          </>
        )}
      </Button>
    </form>
  )
}

// Individual field renderer
type FormFieldRendererProps = {
  field: FormField
  value: string | boolean | number | undefined
  onChange: (name: string, value: string | boolean | number) => void
  disabled?: boolean
}

function FormFieldRenderer({
  field,
  value,
  onChange,
  disabled,
}: FormFieldRendererProps) {
  // Message blocks render as static content
  if (field.blockType === 'message') {
    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-white/80">
        {/* TODO: Render rich text message content */}
        <p className="text-sm">Message content</p>
      </div>
    )
  }

  const name = field.name
  const label = field.label || field.name
  const required = field.required ?? false
  const width = field.width ?? 100

  // Calculate grid column span based on width
  const getWidthClass = () => {
    if (width <= 25) return 'sm:col-span-1'
    if (width <= 50) return 'sm:col-span-2'
    if (width <= 75) return 'sm:col-span-3'
    return 'sm:col-span-4'
  }

  const commonLabelProps = {
    className: 'text-sm font-medium text-white/90',
  }

  switch (field.blockType) {
    case 'text':
      return (
        <div className={cn('space-y-2', getWidthClass())}>
          <Label htmlFor={name} {...commonLabelProps}>
            {label}
            {required && <span className="ml-1 text-amber-400">*</span>}
          </Label>
          <Input
            id={name}
            name={name}
            type="text"
            value={String(value ?? '')}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            disabled={disabled}
            placeholder={`Enter ${label?.toLowerCase() || 'text'}...`}
          />
        </div>
      )

    case 'email':
      return (
        <div className={cn('space-y-2', getWidthClass())}>
          <Label htmlFor={name} {...commonLabelProps}>
            {label}
            {required && <span className="ml-1 text-amber-400">*</span>}
          </Label>
          <Input
            id={name}
            name={name}
            type="email"
            value={String(value ?? '')}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            disabled={disabled}
            placeholder="your@email.com"
          />
        </div>
      )

    case 'number':
      return (
        <div className={cn('space-y-2', getWidthClass())}>
          <Label htmlFor={name} {...commonLabelProps}>
            {label}
            {required && <span className="ml-1 text-amber-400">*</span>}
          </Label>
          <Input
            id={name}
            name={name}
            type="number"
            value={String(value ?? '')}
            onChange={(e) => onChange(name, e.target.valueAsNumber || e.target.value)}
            required={required}
            disabled={disabled}
          />
        </div>
      )

    case 'textarea':
      return (
        <div className={cn('space-y-2', getWidthClass())}>
          <Label htmlFor={name} {...commonLabelProps}>
            {label}
            {required && <span className="ml-1 text-amber-400">*</span>}
          </Label>
          <Textarea
            id={name}
            name={name}
            value={String(value ?? '')}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            disabled={disabled}
            placeholder={`Enter ${label?.toLowerCase() || 'message'}...`}
            rows={4}
          />
        </div>
      )

    case 'checkbox':
      return (
        <div className={cn('flex items-center gap-3', getWidthClass())}>
          <Checkbox
            id={name}
            checked={Boolean(value)}
            onCheckedChange={(checked) =>
              onChange(name, checked.checked === true)
            }
            disabled={disabled}
          />
          <Label htmlFor={name} className="text-sm text-white/90 cursor-pointer">
            {label}
            {required && <span className="ml-1 text-amber-400">*</span>}
          </Label>
        </div>
      )

    case 'select':
      const options = field.options || []
      const collection = createListCollection({
        items: options.map((opt) => ({
          label: opt.label,
          value: opt.value,
        })),
      })

      return (
        <div className={cn('space-y-2', getWidthClass())}>
          <Label {...commonLabelProps}>
            {label}
            {required && <span className="ml-1 text-amber-400">*</span>}
          </Label>
          <Select
            collection={collection}
            value={value ? [String(value)] : []}
            onValueChange={(details) =>
              onChange(name, details.value[0] || '')
            }
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label?.toLowerCase() || 'option'}...`} />
            </SelectTrigger>
            <SelectPopup>
              {options.map((option) => (
                <SelectItem key={option.value} item={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      )

    default:
      return null
  }
}

export default FormRenderer
