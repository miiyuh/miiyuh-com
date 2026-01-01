export type GalleryStatus = 'draft' | 'published'

// Media object from Payload
export type MediaDocument = {
  id: string | number
  url?: string | null
  filename?: string | null
  alt?: string | null
  caption?: string | null
}

// Image item within a gallery collection (embedded in array)
export type GalleryImageItem = {
  id?: string
  image: MediaDocument | string | number
  title?: string | null
  description?: string | null
  published?: boolean | null
  displayOrder?: number | null
}

// Gallery collection with embedded images
export type GalleryCollectionDocument = {
  id: string | number
  slug: string
  title: string
  description?: string | null
  status: GalleryStatus
  displayOrder?: number | null
  images?: GalleryImageItem[] | null
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
