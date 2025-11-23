const API_MEDIA_SEGMENT = '/api/media/'

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
  const normalized = normalizeMediaUrl(url)
  if (normalized) {
    return normalized
  }

  if (filename) {
    return `/api/media/file/${filename}`
  }

  return undefined
}
