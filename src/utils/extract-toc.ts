// Extract Table of Contents from Lexical JSON content.
// Uses the shared slugify utility to ensure slugs match the renderer.

import type { TOCItemType } from 'fumadocs-core/toc'
import { SlugGenerator } from './slugify'

// Minimal types for TOC extraction - accepts any Lexical-like structure
type LexicalNode = {
  type: string
  tag?: string
  text?: string
  format?: number | string
  children?: LexicalNode[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLexicalContent = { root?: any } | null | undefined

/**
 * Extract plain text from a Lexical node and its children.
 * Recursively traverses all child nodes to build the complete text.
 */
function extractTextFromNode(node: LexicalNode): string {
  if (node.type === 'text' && node.text) {
    return node.text
  }

  if (node.children) {
    return node.children.map(extractTextFromNode).join('')
  }

  return ''
}

/**
 * Extract TOC items from Lexical content (server-side).
 * This extracts headings directly from the Lexical JSON structure.
 *
 * Uses SlugGenerator to ensure unique slugs and consistency with the renderer.
 * Supports all heading levels (h1-h6).
 *
 * @param content - Lexical JSON content with root node
 * @returns Array of TOCItemType for fumadocs-core
 */
export function extractTocFromLexical(content: AnyLexicalContent): TOCItemType[] {
  if (!content?.root?.children) return []

  const toc: TOCItemType[] = []
  const slugGenerator = new SlugGenerator()

  function extractHeadings(nodes: LexicalNode[]) {
    for (const node of nodes) {
      if (node.type === 'heading' && node.tag) {
        const text = extractTextFromNode(node)
        if (text) {
          const slug = slugGenerator.generate(text)
          const depth = parseInt(node.tag.replace('h', ''), 10)

          // Only include valid heading depths (1-6)
          if (depth >= 1 && depth <= 6) {
            toc.push({
              title: text,
              url: `#${slug}`,
              depth,
            })
          }
        }
      }

      // Recurse into children to find nested headings
      if (node.children) {
        extractHeadings(node.children)
      }
    }
  }

  extractHeadings(content.root.children)
  return toc
}

/**
 * Client-side: Extract TOC from rendered HTML element.
 * Use this when you don't have access to original Lexical content.
 *
 * This reads headings that already have id attributes set by the renderer.
 *
 * @param element - The HTML element containing rendered content
 * @returns Array of TOCItemType for fumadocs-core
 */
export function extractTocFromElement(element: HTMLElement | null): TOCItemType[] {
  if (!element) return []

  const headingEls = Array.from(
    element.querySelectorAll('h1, h2, h3, h4, h5, h6')
  ) as HTMLHeadingElement[]

  return headingEls
    .filter((el) => el.id && el.textContent?.trim())
    .map((el) => ({
      title: el.textContent!.trim(),
      url: `#${el.id}`,
      depth: Number(el.tagName[1]),
    }))
}
