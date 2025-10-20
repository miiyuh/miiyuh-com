import { getPayload } from 'payload'
import config from '@payload-config'
import GalleryClient from './gallery-client'

export const metadata = {
  title: 'gallery - miiyuh',
  description: 'photography and artwork gallery',
}

// Use dynamic rendering to avoid Server Action caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function GalleryPage() {
  const payload = await getPayload({ config })
  
  const { docs: collections } = await payload.find({
    collection: 'gallery-collections',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 0,
    sort: 'displayOrder',
  })

  const collectionsWithImages = await Promise.all(
    collections.map(async (collection: any) => {
      const { docs: images } = await payload.find({
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

      return {
        ...collection,
        images,
      }
    })
  )

  const galleryData: Record<string, any[]> = {}
  
  collectionsWithImages.forEach((collection: any) => {
    if (collection.images && collection.images.length > 0) {
      galleryData[collection.slug] = collection.images.map((imgDoc: any) => {
        const imageMedia = typeof imgDoc.image === 'object' ? imgDoc.image : null
        
        return {
          src: imageMedia?.url || `/api/media/file/${imageMedia?.filename}`,
          title: imgDoc.title || imageMedia?.alt || '',
          description: imgDoc.description || imageMedia?.caption || '',
        }
      })
    }
  })

  const clientCollections = collectionsWithImages.map((c: any) => ({
    id: String(c.id),
    slug: c.slug,
    title: c.title,
    description: c.description,
    status: c.status,
  }))

  return <GalleryClient galleryData={galleryData} collections={clientCollections} />
}
