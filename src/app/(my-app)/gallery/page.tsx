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

// ISR: Revalidate every 60 seconds for faster repeat visits
// The loading.tsx will show a skeleton during the initial fetch
export const revalidate = 60

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
    depth: 0,
    sort: 'displayOrder',
  })

  const collections = collectionDocs as GalleryCollectionDocument[]

  const previewEntries = await Promise.all(
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
        limit: PREVIEW_IMAGE_LIMIT,
      })

      const images = imageDocs as GalleryImageDocument[]

      const previewItems = images
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

      return {
        slug: collection.slug,
        items: previewItems,
      }
    })
  )

  const galleryData: GalleryDataMap = {}
  
  previewEntries.forEach(({ slug, items }) => {
    if (items.length > 0) {
      galleryData[slug] = items
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
