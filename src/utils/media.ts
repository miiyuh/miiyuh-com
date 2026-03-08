const API_MEDIA_SEGMENT = '/api/media/'
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL || ''

const ensureLeadingSlash = (value: string) =>
  value.startsWith('/') ? value : `/${value}`

export const normalizeMediaUrl = (rawUrl?: string | null): string | undefined => {
  if (!rawUrl) return undefined

  const trimmed = rawUrl.trim()
  if (!trimmed) return undefined

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const segmentIndex = trimmed.indexOf(API_MEDIA_SEGMENT)
    if (segmentIndex >= 0) {
      return ensureLeadingSlash(trimmed.slice(segmentIndex))
    }
  }

  return trimmed
}

export const resolveMediaSrc = ({
  url,
  filename,
}: {
  url?: string | null
  filename?: string | null
}): string | undefined => {
  // Prefer direct R2 URLs when configured and filename is available
  if (R2_BASE_URL && filename) {
    return `${R2_BASE_URL}/${filename}`
  }

  const normalized = normalizeMediaUrl(url)
  if (normalized) {
    return normalized
  }

  if (filename) {
    return `/api/media/file/${filename}`
  }

  return undefined
}
