'use client'

import React from 'react'

interface RichTextRendererProps {
  content: unknown
  className?: string
}

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
  format?: number
  tag?: string
  url?: string
  target?: string
  rel?: string
  listType?: string
  value?: number
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[]
  }
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  const [htmlContent, setHtmlContent] = React.useState<string>('')

  const extractTextFromObject = React.useCallback((obj: unknown): string => {
    if (typeof obj === 'string') return obj
    if (typeof obj !== 'object' || obj === null) return ''
    
    const node = obj as Record<string, unknown>
    let text = ''
    
    if (typeof node.text === 'string') {
      text += node.text
    }
    
    if (Array.isArray(node.children)) {
      text += node.children.map(extractTextFromObject).join('')
    }
    
    if (node.root && typeof node.root === 'object' && node.root !== null) {
      text += extractTextFromObject(node.root)
    }
    
    return text
  }, [])

  const convertLexicalToHTML = React.useCallback((node: LexicalNode): string => {
    if (!node) return ''

    // Handle text nodes
    if (node.type === 'text' && node.text) {
      let text = node.text
      
      // Apply formatting
      if (node.format) {
        if (node.format & 1) text = `<strong>${text}</strong>` // Bold
        if (node.format & 2) text = `<em>${text}</em>` // Italic
        if (node.format & 4) text = `<s>${text}</s>` // Strikethrough
        if (node.format & 8) text = `<u>${text}</u>` // Underline
        if (node.format & 16) text = `<code>${text}</code>` // Code
      }
      
      return text
    }

    // Handle different element types
    let html = ''
    const childrenHTML = node.children?.map(convertLexicalToHTML).join('') || ''

    switch (node.type) {
      case 'paragraph':
        html = `<p>${childrenHTML}</p>`
        break
      case 'heading':
        const level = node.tag || 'h2'
        html = `<${level}>${childrenHTML}</${level}>`
        break
      case 'link':
        const target = node.target ? ` target="${node.target}"` : ''
        const rel = node.rel ? ` rel="${node.rel}"` : ''
        html = `<a href="${node.url || '#'}"${target}${rel}>${childrenHTML}</a>`
        break
      case 'list':
        const listTag = node.listType === 'number' ? 'ol' : 'ul'
        const start = node.value && node.value > 1 ? ` start="${node.value}"` : ''
        html = `<${listTag}${start}>${childrenHTML}</${listTag}>`
        break
      case 'listitem':
        html = `<li>${childrenHTML}</li>`
        break
      case 'quote':
        html = `<blockquote>${childrenHTML}</blockquote>`
        break
      case 'code':
        html = `<pre><code>${childrenHTML}</code></pre>`
        break
      case 'linebreak':
        html = '<br />'
        break
      default:
        // For unknown types, just render the children
        html = childrenHTML
        break
    }

    return html
  }, [])

  const convertToHTML = React.useCallback(async () => {
    if (!content) {
      setHtmlContent('')
      return
    }

    try {
      if (typeof content === 'string') {
        // If content is already HTML string
        setHtmlContent(content)
        return
      }

      const lexicalContent = content as LexicalContent
      
      if (lexicalContent.root?.children) {
        // PayloadCMS Lexical format
        const html = lexicalContent.root.children.map(convertLexicalToHTML).join('')
        setHtmlContent(html)
        return
      }

      if (Array.isArray(content)) {
        // Handle array format
        const html = content.map(item => {
          if (typeof item === 'string') return item
          if (typeof item === 'object' && item !== null && 'text' in item) {
            return String((item as { text: unknown }).text)
          }
          return JSON.stringify(item)
        }).join('')
        setHtmlContent(html)
        return
      }

      // Fallback: try to extract text content
      const textContent = extractTextFromObject(content)
      setHtmlContent(textContent || 'Content not available')
    } catch (error) {
      console.error('Error converting rich text:', error)
      setHtmlContent('Error rendering content')
    }
  }, [content, convertLexicalToHTML, extractTextFromObject])

  React.useEffect(() => {
    convertToHTML()
  }, [convertToHTML])

  if (!htmlContent) {
    return (
      <div className={`text-[#FAF3E0]/60 italic ${className}`}>
        No content available
      </div>
    )
  }

  return (
    <div 
      className={`blog-content prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

// Hook for calculating reading time
export const useReadingTime = (content: unknown): string => {
  const [readingTime, setReadingTime] = React.useState<string>('0 min read')

  React.useEffect(() => {
    if (!content) return

    const extractTextLength = (obj: unknown): number => {
      if (typeof obj === 'string') return obj.length
      if (typeof obj !== 'object' || obj === null) return 0
      
      const node = obj as Record<string, unknown>
      let length = 0
      
      if (typeof node.text === 'string') {
        length += node.text.length
      }
      
      if (Array.isArray(node.children)) {
        length += node.children.reduce((acc: number, child: unknown) => acc + extractTextLength(child), 0)
      }
      
      if (node.root && typeof node.root === 'object' && node.root !== null) {
        length += extractTextLength(node.root)
      }
      
      return length
    }

    const textLength = extractTextLength(content)
    const wordsPerMinute = 200
    const words = textLength / 5 // Approximate words (5 chars per word)
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
    
    setReadingTime(`${minutes} min read`)
  }, [content])

  return readingTime
}
