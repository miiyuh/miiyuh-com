/**
 * Type definitions for Payload CMS Form Builder
 * These types mirror the structure created by @payloadcms/plugin-form-builder
 */

export type FormFieldBase = {
  id?: string
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  defaultValue?: string | null
}

export type TextField = FormFieldBase & {
  blockType: 'text'
}

export type TextareaField = FormFieldBase & {
  blockType: 'textarea'
}

export type EmailField = FormFieldBase & {
  blockType: 'email'
}

export type NumberField = FormFieldBase & {
  blockType: 'number'
}

export type CheckboxField = FormFieldBase & {
  blockType: 'checkbox'
  defaultValue?: boolean | null
}

export type SelectOption = {
  label: string
  value: string
  id?: string
}

export type SelectField = FormFieldBase & {
  blockType: 'select'
  options?: SelectOption[] | null
}

export type MessageField = {
  id?: string
  blockType: 'message'
  message?: unknown // Lexical rich text content
}

export type FormField =
  | TextField
  | TextareaField
  | EmailField
  | NumberField
  | CheckboxField
  | SelectField
  | MessageField

export type EmailConfig = {
  id?: string
  emailTo?: string | null
  emailFrom?: string | null
  replyTo?: string | null
  emailSubject?: string | null
  message?: unknown // Lexical rich text content
}

export type FormDocument = {
  id: string
  title: string
  fields?: FormField[] | null
  submitButtonLabel?: string | null
  confirmationType?: 'message' | 'redirect' | null
  confirmationMessage?: unknown // Lexical rich text content
  redirect?: {
    url?: string | null
  } | null
  emails?: EmailConfig[] | null
  createdAt: string
  updatedAt: string
}

export type FormSubmissionField = {
  field: string
  value: string
}

export type FormSubmission = {
  id: string
  form: string | FormDocument
  submissionData?: FormSubmissionField[] | null
  createdAt: string
  updatedAt: string
}

// Form state for client-side handling
export type FormState = {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

// Form field value types for controlled inputs
export type FormValues = Record<string, string | boolean | number>

// API response types
export type FormSubmitResponse = {
  doc?: FormSubmission
  message?: string
  errors?: Array<{
    field?: string
    message: string
  }>
}
