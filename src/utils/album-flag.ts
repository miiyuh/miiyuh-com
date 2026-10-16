import type { GalleryCollectionDocument } from '@/types/gallery'

// The CMS `flag` field wins. Until it is filled in for existing albums, fall back
// to the old slug rule that used to be hardcoded in the gallery components.
export function getAlbumFlag(collection: Pick<GalleryCollectionDocument, 'slug' | 'flag'>): string | null {
  if (collection.flag) return collection.flag
  return collection.slug.includes('japan') || collection.slug.includes('2025') ? '🇯🇵' : null
}
