// Production-ready Lexical to HTML renderer
// Supports all Lexical node types with XSS protection and accessibility
// Uses shared slugify utility for consistent heading IDs with TOC extraction

import { SlugGenerator, extractNodeText } from './slugify'
import { normalizeMediaUrl } from './media'

// ============================================================================
// Types
// ============================================================================

type LexicalBaseNode = {
  children?: LexicalNode[]
  tag?: string
  format?: number | string
  direction?: string
  indent?: number
}

type LexicalTextNode = LexicalBaseNode & {
  type: 'text'
  text: string
  format?: number
  style?: string
}

type LexicalElementNode = LexicalBaseNode & {
  type:
    | 'root'
    | 'paragraph'
    | 'heading'
    | 'list'
    | 'listitem'
    | 'quote'
    | 'linebreak'
    | 'code'
    | 'horizontalrule'
}

type LexicalLinkNode = LexicalBaseNode & {
  type: 'link' | 'autolink'
  url?: string
  rel?: string
  target?: string
}

type LexicalImageNode = LexicalBaseNode & {
  type: 'image'
  src?: string
  url?: string
  alt?: string
  altText?: string
  caption?: string
  width?: number
  height?: number
}

type LexicalUploadNode = LexicalBaseNode & {
  type: 'upload'
  value?: {
    url?: string
    src?: string
    alt?: string
    caption?: string
    width?: number
    height?: number
    mimeType?: string
  }
  src?: string
  alt?: string
  caption?: string
}

type LexicalTableNode = LexicalBaseNode & {
  type: 'table'
}

type LexicalTableRowNode = LexicalBaseNode & {
  type: 'tablerow'
}

type LexicalTableCellNode = LexicalBaseNode & {
  type: 'tablecell'
  headerState?: number
  colSpan?: number
  rowSpan?: number
  backgroundColor?: string
}

type LexicalCodeBlockNode = LexicalBaseNode & {
  type: 'code'
  language?: string
}

type LexicalCalloutNode = LexicalBaseNode & {
  type: 'callout' | 'admonition'
  calloutType?: 'info' | 'warning' | 'error' | 'success' | 'note'
}

type LexicalSpoilerNode = LexicalBaseNode & {
  type: 'spoiler' | 'collapsible'
  title?: string
  open?: boolean
}

type LexicalVideoNode = LexicalBaseNode & {
  type: 'video' | 'embed'
  src?: string
  url?: string
  provider?: string
  title?: string
  width?: number
  height?: number
}

type LexicalNode =
  | LexicalTextNode
  | LexicalElementNode
  | LexicalLinkNode
  | LexicalImageNode
  | LexicalUploadNode
  | LexicalTableNode
  | LexicalTableRowNode
  | LexicalTableCellNode
  | LexicalCodeBlockNode
  | LexicalCalloutNode
  | LexicalSpoilerNode
  | LexicalVideoNode

export type LexicalContent = {
  root?: LexicalNode
}

// ============================================================================
// XSS Protection
// ============================================================================

const ALLOWED_URL_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']

function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char)
}

function sanitizeUrl(url: string | undefined): string {
  if (!url) return '#'
  try {
    const parsed = new URL(url, 'https://example.com')
    if (!ALLOWED_URL_PROTOCOLS.includes(parsed.protocol)) {
      return '#'
    }
    // Escape so the URL cannot break out of the surrounding HTML attribute
    return escapeHtml(url)
  } catch {
    // Relative URLs are allowed
    if (url.startsWith('/') || url.startsWith('#')) {
      return escapeHtml(url)
    }
    return '#'
  }
}

function sanitizeAttribute(value: string | undefined): string {
  if (!value) return ''
  return escapeHtml(value)
}

// Only positive integers may be emitted as width/height attributes
function sanitizeDimension(value: number | undefined): string {
  const num = Number(value)
  return Number.isFinite(num) && num > 0 ? String(Math.round(num)) : ''
}

// CSS color values only (hex, named colors, rgb()/hsl()) — blocks extra
// declarations, url(), and attribute breakout
function sanitizeCssColor(value: string | undefined): string {
  if (!value) return ''
  return /^[#a-zA-Z0-9(),.%\s-]+$/.test(value) ? value : ''
}

// ============================================================================
// Inline Formatting
// ============================================================================

// Lexical format bitmask values
const FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
  HIGHLIGHT: 128,
} as const

function applyTextFormatting(text: string, format: number | undefined): string {
  if (!format) return text

  let result = text

  // Apply in reverse order of nesting preference
  if (format & FORMAT.HIGHLIGHT) result = `<mark>${result}</mark>`
  if (format & FORMAT.SUBSCRIPT) result = `<sub>${result}</sub>`
  if (format & FORMAT.SUPERSCRIPT) result = `<sup>${result}</sup>`
  if (format & FORMAT.CODE) result = `<code>${result}</code>`
  if (format & FORMAT.UNDERLINE) result = `<u>${result}</u>`
  if (format & FORMAT.STRIKETHROUGH) result = `<s>${result}</s>`
  if (format & FORMAT.ITALIC) result = `<em>${result}</em>`
  if (format & FORMAT.BOLD) result = `<strong>${result}</strong>`

  return result
}

// ============================================================================
// Callout/Admonition Styling
// ============================================================================

const CALLOUT_STYLES: Record<string, { icon: string; classes: string }> = {
  info: {
    icon: 'i',
    classes: 'border-blue-500/50 bg-blue-500/10',
  },
  warning: {
    icon: '!',
    classes: 'border-yellow-500/50 bg-yellow-500/10',
  },
  error: {
    icon: 'x',
    classes: 'border-red-500/50 bg-red-500/10',
  },
  success: {
    icon: '✓',
    classes: 'border-green-500/50 bg-green-500/10',
  },
  note: {
    icon: '📝',
    classes: 'border-gray-500/50 bg-gray-500/10',
  },
}

// ============================================================================
// Main Renderer
// ============================================================================

export function renderLexicalContent(content: { root?: Record<string, unknown> } | null | undefined): string {
  if (!content || typeof content !== 'object') {
    return ''
  }

  if (!content.root || !content.root.children) {
    return ''
  }

  const slugGenerator = new SlugGenerator()
  return renderNode(content.root as LexicalNode, slugGenerator)
}

// ---------------------------------------------------------------------------
// Image delivery
// ---------------------------------------------------------------------------

// Rich-text images previously pointed straight at Payload's media route, which
// on Vercel resolves to the catch-all serverless function and streams the
// original from R2 with `Cache-Control: max-age=0, must-revalidate` — so every
// image on every view re-ran the function uncached, at full size. Routing them
// through the Next image optimizer instead serves AVIF/WebP at the width the
// layout actually needs, and those responses are CDN-cacheable.
//
// The optimizer rejects absolute same-origin URLs ("url" parameter is not
// allowed), so the path is normalised to a root-relative one first.
const OPTIMIZER_WIDTHS = [640, 828, 1080, 1920] as const
const OPTIMIZER_QUALITY = 75

function optimizedImage(rawSrc: string): { src: string; srcset: string } | null {
  const normalized = normalizeMediaUrl(rawSrc)
  if (!normalized || !normalized.startsWith('/')) return null

  const url = (w: number) =>
    `/_next/image?url=${encodeURIComponent(normalized)}&w=${w}&q=${OPTIMIZER_QUALITY}`

  return {
    src: url(1080),
    srcset: OPTIMIZER_WIDTHS.map((w) => `${url(w)} ${w}w`).join(', '),
  }
}

// The content column is capped at max-w-4xl (896px).
const IMAGE_SIZES = '(max-width: 768px) 100vw, 896px'

function imageMarkup(
  rawSrc: string,
  alt: string,
  width: string,
  height: string
): string {
  const optimized = optimizedImage(rawSrc)
  const srcAttr = optimized ? optimized.src : rawSrc
  const extra = optimized ? ` srcset="${optimized.srcset}" sizes="${IMAGE_SIZES}"` : ''
  // `animate-pulse` stays on the wrapper as a CSS-only loading state — a loaded
  // image paints over it. It must not depend on JS: inline handlers are blocked
  // by the site's CSP (script-src has neither unsafe-inline nor unsafe-hashes).
  return `<div class="relative overflow-hidden rounded-2xl bg-white/5 animate-pulse shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
          <img src="${srcAttr}"${extra} alt="${alt}"${width}${height} loading="lazy" decoding="async" class="w-full h-auto rounded-2xl" />
        </div>`
}

function renderNode(node: LexicalNode, slugGenerator: SlugGenerator): string {
  if (!node) return ''

  // Text node
  if (node.type === 'text') {
    const textNode = node as LexicalTextNode
    const escapedText = escapeHtml(textNode.text || '')
    return applyTextFormatting(escapedText, textNode.format)
  }

  // Handle children recursively
  const childrenHtml = node.children
    ? node.children.map((child) => renderNode(child, slugGenerator)).join('')
    : ''

  // Block-level nodes
  switch (node.type) {
    case 'root':
      return childrenHtml

    case 'paragraph': {
      const indent = (node as LexicalBaseNode).indent
      const indentStyle = indent ? ` style="margin-left: ${indent * 2}rem"` : ''
      return `<p${indentStyle}>${childrenHtml || '<br>'}</p>`
    }

    case 'heading': {
      const tag = node.tag || 'h2'
      const validTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h2'
      // Slug from the raw node text, not childrenHtml — the latter is already
      // HTML-escaped, which corrupts slugs for apostrophes, quotes and ampersands.
      const slug = slugGenerator.generate(extractNodeText(node))
      return `<${validTag} id="${slug}">${childrenHtml}</${validTag}>`
    }

    case 'list': {
      const listTag = node.tag === 'ol' ? 'ol' : 'ul'
      const listClass = listTag === 'ol' ? 'list-decimal' : 'list-disc'
      return `<${listTag} class="${listClass} pl-6 space-y-1">${childrenHtml}</${listTag}>`
    }

    case 'listitem': {
      const indent = (node as LexicalBaseNode).indent
      const indentStyle = indent ? ` style="margin-left: ${indent * 1.5}rem"` : ''
      return `<li${indentStyle}>${childrenHtml}</li>`
    }

    case 'quote':
      return `<blockquote class="border-l-4 border-white/20 pl-4 italic text-text-secondary">${childrenHtml}</blockquote>`

    case 'link':
    case 'autolink': {
      const linkNode = node as LexicalLinkNode
      const href = sanitizeUrl(linkNode.url)
      const isExternal = href.startsWith('http')
      const rel = isExternal ? 'noopener noreferrer' : ''
      const target = isExternal ? '_blank' : ''
      return `<a href="${href}"${target ? ` target="${target}"` : ''}${rel ? ` rel="${rel}"` : ''} class="text-accent-primary hover:underline">${childrenHtml}</a>`
    }

    case 'linebreak':
      return '<br>'

    case 'horizontalrule':
      return '<hr class="my-8 border-white/10">'

    case 'code': {
      const codeNode = node as LexicalCodeBlockNode
      const language = sanitizeAttribute(codeNode.language)
      const langClass = language ? ` class="language-${language}"` : ''
      return `<pre class="rounded-lg bg-black/30 p-4 overflow-x-auto"><code${langClass}>${childrenHtml}</code></pre>`
    }

    case 'image': {
      const imgNode = node as LexicalImageNode
      const src = sanitizeUrl(imgNode.src || imgNode.url)
      const alt = sanitizeAttribute(imgNode.alt || imgNode.altText) || 'Image'
      const caption = imgNode.caption ? sanitizeAttribute(imgNode.caption) : ''
      const safeWidth = sanitizeDimension(imgNode.width)
      const safeHeight = sanitizeDimension(imgNode.height)
      const width = safeWidth ? ` width="${safeWidth}"` : ''
      const height = safeHeight ? ` height="${safeHeight}"` : ''
      return `<figure class="my-8">
        ${imageMarkup(src, alt, width, height)}
        ${caption ? `<figcaption class="mt-2 text-center text-sm text-text-secondary">${caption}</figcaption>` : ''}
      </figure>`
    }

    case 'upload': {
      const uploadNode = node as LexicalUploadNode
      const src = sanitizeUrl(
        uploadNode.value?.url || uploadNode.value?.src || uploadNode.src
      )
      const alt = sanitizeAttribute(
        uploadNode.value?.alt || uploadNode.alt
      ) || 'Image'
      const caption = sanitizeAttribute(
        uploadNode.value?.caption || uploadNode.caption
      )
      const safeWidth = sanitizeDimension(uploadNode.value?.width)
      const safeHeight = sanitizeDimension(uploadNode.value?.height)
      const width = safeWidth ? ` width="${safeWidth}"` : ''
      const height = safeHeight ? ` height="${safeHeight}"` : ''
      // Check if it's a video
      const mimeType = uploadNode.value?.mimeType || ''
      if (mimeType.startsWith('video/')) {
        return `<figure class="my-8">
          <video src="${src}" controls preload="metadata" class="w-full rounded-2xl">
            Your browser does not support the video tag.
          </video>
          ${caption ? `<figcaption class="mt-2 text-center text-sm text-text-secondary">${caption}</figcaption>` : ''}
        </figure>`
      }

      return `<figure class="my-8">
        ${imageMarkup(src, alt, width, height)}
        ${caption ? `<figcaption class="mt-2 text-center text-sm text-text-secondary">${caption}</figcaption>` : ''}
      </figure>`
    }

    case 'table': {
      return `<div class="my-8 overflow-x-auto">
        <table class="w-full border-collapse border border-white/10">
          ${childrenHtml}
        </table>
      </div>`
    }

    case 'tablerow':
      return `<tr class="border-b border-white/10">${childrenHtml}</tr>`

    case 'tablecell': {
      const cellNode = node as LexicalTableCellNode
      const isHeader = cellNode.headerState && cellNode.headerState > 0
      const tag = isHeader ? 'th' : 'td'
      const colSpan = cellNode.colSpan && cellNode.colSpan > 1 ? ` colspan="${cellNode.colSpan}"` : ''
      const rowSpan = cellNode.rowSpan && cellNode.rowSpan > 1 ? ` rowspan="${cellNode.rowSpan}"` : ''
      const safeBgColor = sanitizeCssColor(cellNode.backgroundColor)
      const bgColor = safeBgColor ? ` style="background-color: ${safeBgColor}"` : ''
      const cellClass = isHeader
        ? 'px-4 py-2 text-left font-semibold bg-white/5'
        : 'px-4 py-2'
      return `<${tag} class="${cellClass}"${colSpan}${rowSpan}${bgColor}>${childrenHtml}</${tag}>`
    }

    case 'callout':
    case 'admonition': {
      const calloutNode = node as LexicalCalloutNode
      const calloutType = calloutNode.calloutType || 'info'
      const style = CALLOUT_STYLES[calloutType] || CALLOUT_STYLES.info
      return `<aside class="my-6 rounded-lg border-l-4 p-4 ${style.classes}" role="note">
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-sm font-bold">${style.icon}</span>
          <div class="flex-1">${childrenHtml}</div>
        </div>
      </aside>`
    }

    case 'spoiler':
    case 'collapsible': {
      const spoilerNode = node as LexicalSpoilerNode
      const title = sanitizeAttribute(spoilerNode.title) || 'Click to reveal'
      const open = spoilerNode.open ? ' open' : ''
      return `<details class="my-4 rounded-lg border border-white/10 overflow-hidden"${open}>
        <summary class="px-4 py-3 cursor-pointer bg-white/5 hover:bg-white/10 transition-colors font-medium">${title}</summary>
        <div class="px-4 py-3">${childrenHtml}</div>
      </details>`
    }

    case 'video':
    case 'embed': {
      const videoNode = node as LexicalVideoNode
      const src = sanitizeUrl(videoNode.src || videoNode.url)
      const title = sanitizeAttribute(videoNode.title) || 'Embedded content'

      // YouTube/Vimeo embed detection
      if (src.includes('youtube.com') || src.includes('youtu.be')) {
        const videoId = extractYouTubeId(src)
        if (videoId) {
          return `<figure class="my-8 aspect-video">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              title="${title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
              class="w-full h-full rounded-2xl"
            ></iframe>
          </figure>`
        }
      }

      if (src.includes('vimeo.com')) {
        const videoId = extractVimeoId(src)
        if (videoId) {
          return `<figure class="my-8 aspect-video">
            <iframe
              src="https://player.vimeo.com/video/${videoId}"
              title="${title}"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              loading="lazy"
              class="w-full h-full rounded-2xl"
            ></iframe>
          </figure>`
        }
      }

      // Generic video
      return `<figure class="my-8">
        <video src="${src}" controls preload="metadata" class="w-full rounded-2xl">
          Your browser does not support the video tag.
        </video>
      </figure>`
    }

    default:
      // Unknown node type - render children if any
      return childrenHtml
  }
}

// ============================================================================
// Video ID Extractors
// ============================================================================

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,20})/,
    /youtube\.com\/v\/([A-Za-z0-9_-]{6,20})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}
