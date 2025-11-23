import { getPayload } from 'payload'
import config from '@payload-config'
import GalleryClient from './gallery-client'
import type {
  GalleryCollectionDocument,
  GalleryCollectionSummary,
  GalleryDataMap,
  GalleryImageDocument,
  GalleryItem,
} from '@/types/gallery'
import { resolveMediaSrc } from '@/utils/media'

export const metadata = {
  title: 'gallery - miiyuh',
  description: 'photography and artwork gallery',
}

// Use dynamic rendering to avoid Server Action caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function GalleryPage() {
  const payload = await getPayload({ config })
  
  const { docs: collectionDocs } = await payload.find({
    collection: 'gallery-collections',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 0,
    sort: 'displayOrder',
  })

  const collections = collectionDocs as GalleryCollectionDocument[]

  type CollectionWithImages = GalleryCollectionDocument & {
    images: GalleryImageDocument[]
  }

  const collectionsWithImages: CollectionWithImages[] = await Promise.all(
    collections.map(async (collection) => {
      const { docs: imageDocs } = await payload.find({
        collection: 'gallery-images',
        where: {
          and: [
            {
              galleryCollection: {
                equals: collection.id,
              },
            },
            {
              published: {
                equals: true,
              },
            },
          ],
        },
        depth: 1,
        sort: 'displayOrder',
      })

      const images = imageDocs as GalleryImageDocument[]

      return {
        ...collection,
        images,
      }
    })
  )

  const galleryData: GalleryDataMap = {}
  
  collectionsWithImages.forEach((collection) => {
    if (collection.images.length === 0) return

    const items = collection.images
      .map((imgDoc) => {
        const imageMedia =
          imgDoc.image && typeof imgDoc.image === 'object'
            ? imgDoc.image
            : null

        const src = resolveMediaSrc({
          url: imageMedia?.url,
          filename: imageMedia?.filename,
        })

        if (!src) {
          return null
        }

        return {
          src,
          title: imgDoc.title ?? imageMedia?.alt ?? '',
          description: imgDoc.description ?? imageMedia?.caption ?? '',
        }
      })
      .filter((item): item is GalleryItem => Boolean(item))

    if (items.length > 0) {
      galleryData[collection.slug] = items
    }
  })

  const clientCollections: GalleryCollectionSummary[] = collectionsWithImages.map((collection) => ({
    id: String(collection.id),
    slug: collection.slug,
    title: collection.title,
    description: collection.description ?? '',
    status: collection.status,
  }))

  return <GalleryClient galleryData={galleryData} collections={clientCollections} />
}
