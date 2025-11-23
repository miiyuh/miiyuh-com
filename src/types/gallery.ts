export type GalleryStatus = 'draft' | 'published'

export type GalleryCollectionDocument = {
  id: string | number
  slug: string
  title: string
  description?: string | null
  status: GalleryStatus
  displayOrder?: number | null
}

export type GalleryImageDocument = {
  id: string | number
  title: string
  description?: string | null
  galleryCollection: string | number | GalleryCollectionDocument
  image:
    | {
        url?: string | null
        filename?: string | null
        alt?: string | null
        caption?: string | null
      }
    | string
  displayOrder?: number | null
  published?: boolean | null
}

export type GalleryItem = {
  src: string
  title: string
  description: string
}

export type GalleryCollectionSummary = {
  id: string
  slug: string
  title: string
  description?: string | null
  status: GalleryStatus
}

export type GalleryDataMap = Record<string, GalleryItem[]>
