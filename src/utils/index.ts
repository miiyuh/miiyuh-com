// Utility exports

/**
 * Returns true for gallery collection slugs that correspond to Japan-related albums.
 * Used to conditionally render the Japan flag emoji on collection cards and headers.
 */
export function isJapanCollection(slug: string): boolean {
  return slug.includes("japan") || slug.includes("2025");
}
