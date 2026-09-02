// Shared slug generation utility for Lexical heading IDs and TOC extraction.
// Both the lexical-renderer and extract-toc must use this to ensure consistent slugs.

/**
 * Generate a URL-safe slug from text.
 * Format: kebab-case, lowercase, symbols stripped, spaces collapsed.
 *
 * @param text - The heading text to slugify
 * @returns A URL-safe slug string
 */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      // Strip HTML tags (in case formatted text is passed)
      .replace(/<[^>]*>/g, '')
      .trim()
      // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/[^a-z0-9\s-]/g, '')
      // Collapse multiple spaces/hyphens into single hyphen
      .replace(/[\s-]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '') || 'heading'
  )
}

/**
 * Extract plain text from a Lexical node and its descendants.
 *
 * Both the renderer and the TOC extractor must slugify *this* — the raw node
 * text — not rendered HTML. Rendered HTML is already escaped, so an apostrophe
 * arrives as `&#39;` and slugify() reduces it to the digits `39`, producing
 * `how-it39s-built` where the TOC expects `how-its-built`.
 */
export function extractNodeText(node: {
  type?: string
  text?: string
  children?: unknown[]
}): string {
  if (node.type === 'text' && node.text) return node.text
  if (Array.isArray(node.children)) {
    return node.children
      .map((child) => extractNodeText(child as Parameters<typeof extractNodeText>[0]))
      .join('')
  }
  return ''
}

/**
 * Slug generator class that tracks duplicates and appends suffixes.
 * Use a single instance per render/extraction pass to ensure consistency.
 */
export class SlugGenerator {
  private slugCounts = new Map<string, number>()

  /**
   * Reset the internal counter. Call before a new render/extraction pass.
   */
  reset(): void {
    this.slugCounts.clear()
  }

  /**
   * Generate a unique slug, appending -2, -3, etc. for duplicates.
   *
   * @param text - The heading text to slugify
   * @returns A unique slug string
   */
  generate(text: string): string {
    const baseSlug = slugify(text)

    const count = this.slugCounts.get(baseSlug) || 0
    this.slugCounts.set(baseSlug, count + 1)

    return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`
  }
}
