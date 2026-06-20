export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function slugField(opts?: {
  titleField?: string
  fieldName?: string
  width?: string
}) {
  const titleField = opts?.titleField ?? 'title'

  return {
    name: opts?.fieldName ?? 'slug',
    type: 'text' as const,
    required: true,
    unique: true,
    index: true,
    admin: {
      ...(opts?.width ? { width: opts.width } : {}),
      description: 'URL-friendly identifier (auto-generated from title)',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }: { value?: unknown; data?: Record<string, unknown> }) => {
          if (value && typeof value === 'string') {
            return generateSlug(value)
          }

          const title = data?.[titleField]
          if (title && typeof title === 'string') {
            return generateSlug(title)
          }

          return value
        },
      ],
    },
  }
}
