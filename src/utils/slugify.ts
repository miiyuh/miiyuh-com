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
