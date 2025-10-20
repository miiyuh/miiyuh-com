// Simple Lexical to HTML renderer for blog posts
// This converts Lexical's JSON format into readable HTML

type LexicalNode = {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  url?: string
  src?: string
  alt?: string
  direction?: string | null
  indent?: number
  version?: number
}

type LexicalContent = {
  root?: LexicalNode
}

export function renderLexicalContent(content: any): string {
  if (!content || typeof content !== 'object') {
    return ''
  }

  const lexicalContent = content as LexicalContent
  if (!lexicalContent.root || !lexicalContent.root.children) {
    return ''
  }

  return renderNode(lexicalContent.root)
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
      const url = (node as any).url || '#'
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${childrenHtml}</a>`

    case 'linebreak':
      return '<br>'

    case 'code':
      return `<pre><code>${childrenHtml}</code></pre>`

    case 'image':
      const src = (node as any).src || (node as any).url || ''
      const alt = (node as any).alt || (node as any).altText || 'Image'
      return `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 0.5rem;" />`

    case 'upload':
      // Handle upload nodes (Payload's image upload type)
      const uploadSrc = (node as any).value?.url || (node as any).value?.src || (node as any).src || ''
      const uploadAlt = (node as any).value?.alt || (node as any).alt || 'Image'
      return `<img src="${uploadSrc}" alt="${uploadAlt}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 0.5rem;" />`

    default:
      return childrenHtml
  }
}
