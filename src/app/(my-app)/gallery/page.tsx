import { getPayload } from 'payload'
import config from '@payload-config'
import GalleryClient from './gallery-client'
import type {
  GalleryCollectionDocument,
  GalleryCollectionSummary,
  GalleryDataMap,
  GalleryItem,
  GalleryImageItem,
  MediaDocument,
} from '@/types/gallery'
import { resolveMediaSrc } from '@/utils/media'

export const metadata = {
  title: 'gallery - miiyuh',
  description: 'photography and artwork gallery',
}

// ISR: Revalidate every 1 hour for optimal cache efficiency
export const revalidate = 3600

const PREVIEW_IMAGE_LIMIT = 3

export default async function GalleryPage() {
  const payload = await getPayload({ config })
  
  const { docs: collectionDocs } = await payload.find({
    collection: 'gallery-collections',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 2, // Need depth 2 to get nested image media (note: fetches all images per collection, but we only use first 3. Optimization: could use field selection or separate queries)
    sort: 'displayOrder',
  })

  const collections = collectionDocs as GalleryCollectionDocument[]

  // Build gallery data from embedded images
  const galleryData: GalleryDataMap = {}
  
  collections.forEach((collection) => {
    if (!collection.images || collection.images.length === 0) return

    // Sort images by displayOrder and take first 3 for preview
    const sortedImages = [...collection.images].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    )
    
    const previewImages = sortedImages.slice(0, PREVIEW_IMAGE_LIMIT)

    const items: GalleryItem[] = previewImages
      .map((imgItem: GalleryImageItem) => {
        const imageMedia =
          imgItem.image && typeof imgItem.image === 'object'
            ? (imgItem.image as MediaDocument)
            : null

        const src = resolveMediaSrc({
          url: imageMedia?.url,
          filename: imageMedia?.filename,
        })

        if (!src) return null

        return {
          src,
          title: imgItem.title ?? imageMedia?.alt ?? '',
          description: imgItem.description ?? imageMedia?.caption ?? '',
        }
      })
      .filter((item): item is GalleryItem => Boolean(item))

    if (items.length > 0) {
      galleryData[collection.slug] = items
    }
  })

  const clientCollections: GalleryCollectionSummary[] = collections.map((collection) => ({
    id: String(collection.id),
    slug: collection.slug,
    title: collection.title,
    description: collection.description ?? '',
    status: collection.status,
  }))

  return <GalleryClient galleryData={galleryData} collections={clientCollections} />
}
