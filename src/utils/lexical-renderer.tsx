// Simple Lexical to HTML renderer for blog posts
// This converts Lexical's JSON format into readable HTML

type LexicalBaseNode = {
  children?: LexicalNode[]
  tag?: string
}

type LexicalTextNode = LexicalBaseNode & {
  type: 'text'
  text: string
  format?: number
}

type LexicalElementNode = LexicalBaseNode & {
  type: 'root' | 'paragraph' | 'heading' | 'list' | 'listitem' | 'quote' | 'linebreak' | 'code'
}

type LexicalLinkNode = LexicalBaseNode & {
  type: 'link'
  url?: string
}

type LexicalImageNode = LexicalBaseNode & {
  type: 'image'
  src?: string
  url?: string
  alt?: string
  altText?: string
  caption?: string
}

type LexicalUploadNode = LexicalBaseNode & {
  type: 'upload'
  value?: {
    url?: string
    src?: string
    alt?: string
    caption?: string
  }
  src?: string
  alt?: string
  caption?: string
}

type LexicalNode =
  | LexicalTextNode
  | LexicalElementNode
  | LexicalLinkNode
  | LexicalImageNode
  | LexicalUploadNode

export type LexicalContent = {
  root?: LexicalNode
}

export function renderLexicalContent(content: LexicalContent | null | undefined): string {
  if (!content || typeof content !== 'object') {
    return ''
  }

  if (!content.root || !content.root.children) {
    return ''
  }

  return renderNode(content.root)
}

function renderNode(node: LexicalNode): string {
  if (!node) return ''

  // Text node
  if (node.type === 'text' && node.text) {
    let text = node.text

    // Apply formatting based on format bitmask
    if (node.format) {
      if (node.format & 1) text = `<strong>${text}</strong>` // Bold
      if (node.format & 2) text = `<em>${text}</em>` // Italic
      if (node.format & 4) text = `<s>${text}</s>` // Strikethrough
      if (node.format & 8) text = `<u>${text}</u>` // Underline
      if (node.format & 16) text = `<code>${text}</code>` // Code
    }

    return text
  }

  // Handle children
  const childrenHtml = node.children
    ? node.children.map(child => renderNode(child)).join('')
    : ''

  // Block-level nodes
  switch (node.type) {
    case 'root':
      return childrenHtml

    case 'paragraph':
      return `<p>${childrenHtml || '<br>'}</p>`

    case 'heading':
      const tag = node.tag || 'h2'
      return `<${tag}>${childrenHtml}</${tag}>`

    case 'list':
      const listTag = node.tag === 'ol' ? 'ol' : 'ul'
      return `<${listTag}>${childrenHtml}</${listTag}>`

    case 'listitem':
      return `<li>${childrenHtml}</li>`

    case 'quote':
      return `<blockquote>${childrenHtml}</blockquote>`

    case 'link':
      return `<a href="${node.url || '#'}" target="_blank" rel="noopener noreferrer">${childrenHtml}</a>`

    case 'linebreak':
      return '<br>'

    case 'code':
      return `<pre><code>${childrenHtml}</code></pre>`

    case 'image': {
      const src = node.src || node.url || ''
      const alt = node.alt || node.altText || 'Image'
      const caption = node.caption || ''
      return `<div class="my-8">
        <img src="${src}" alt="${alt}" class="w-full h-auto rounded-2xl glass-panel-pro" />
        ${caption ? `<p class="mt-2 text-left text-sm text-text-secondary font-mono" style="font-family: 'Noto Sans Mono', monospace">${caption}</p>` : ''}
      </div>`
    }

    case 'upload': {
      // Handle upload nodes (Payload's image upload type)
      const uploadSrc = node.value?.url || node.value?.src || node.src || ''
      const uploadAlt = node.value?.alt || node.alt || 'Image'
      const uploadCaption = node.value?.caption || node.caption || ''
      return `<div class="my-8">
        <img src="${uploadSrc}" alt="${uploadAlt}" class="w-full h-auto rounded-2xl glass-panel-pro" />
        ${uploadCaption ? `<p class="mt-2 text-left text-sm text-text-secondary font-mono" style="font-family: 'Noto Sans Mono', monospace">${uploadCaption}</p>` : ''}
      </div>`
    }

    default:
      return childrenHtml
  }
}
