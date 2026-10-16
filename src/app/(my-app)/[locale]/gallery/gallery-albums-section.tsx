import { getPayload } from 'payload'
import config from '@payload-config'
import GalleryGrid from './gallery-grid'
import type {
  GalleryCollectionDocument,
  GalleryCollectionSummary,
  GalleryDataMap,
  GalleryItem,
  GalleryImageItem,
  MediaDocument,
} from '@/types/gallery'
import { resolveMediaSrc } from '@/utils/media'

const PREVIEW_IMAGE_LIMIT = 3

export default async function GalleryAlbumsSection() {
  const payload = await getPayload({ config })

  const { docs: collectionDocs } = await payload.find({
    collection: 'gallery-collections',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 1,
    sort: '-albumDate',
    limit: 0,
  })

  const collections = collectionDocs as GalleryCollectionDocument[]

  // Build gallery data from embedded images
  const galleryData: GalleryDataMap = {}

  collections.forEach((collection) => {
    if (!collection.images || collection.images.length === 0) return

    const previewImages = collection.images.slice(0, PREVIEW_IMAGE_LIMIT)

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
    totalImages: collection.images?.length ?? 0,
  }))

  return <GalleryGrid galleryData={galleryData} collections={clientCollections} />
}
