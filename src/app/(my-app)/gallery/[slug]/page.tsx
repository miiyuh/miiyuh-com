import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import AlbumClient from './album-client'
import type {
    GalleryCollectionDocument,
    GalleryCollectionSummary,
    GalleryItem,
} from '@/types/gallery'
import { resolveMediaSrc } from '@/utils/media'

// ISR: Revalidate every 60 seconds for faster repeat visits
// The loading.tsx will show a skeleton during the initial fetch
export const revalidate = 60

type PageParams = {
    slug: string
}

interface PageProps {
    params: Promise<PageParams>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const payload = await getPayload({ config })

    const { docs: collectionDocs } = await payload.find({
        collection: 'gallery-collections',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })

    const [collection] = collectionDocs as GalleryCollectionDocument[]

    if (!collection) {
        return {
            title: 'Album Not Found - miiyuh',
        }
    }

    return {
        title: `${collection.title} - gallery - miiyuh`,
        description: collection.description || `View ${collection.title} album`,
    }
}

export default async function AlbumPage({ params }: PageProps) {
    const { slug } = await params
    const payload = await getPayload({ config })

    // Single query with depth: 2 to get full media objects within images array
    const { docs: collectionDocs } = await payload.find({
        collection: 'gallery-collections',
        where: {
            and: [
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    status: {
                        equals: 'published',
                    },
                },
            ],
        },
        depth: 2,
        limit: 1,
    })

    const [collection] = collectionDocs as GalleryCollectionDocument[]

    if (!collection) {
        notFound()
    }

    // Transform embedded images array to GalleryItem format
    const galleryImages: GalleryItem[] = (collection.images ?? [])
        .filter((img) => img.published !== false)
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        .map((img) => {
            const imageMedia = typeof img.image === 'object' ? img.image : null

            const src = resolveMediaSrc({
                url: imageMedia?.url,
                filename: imageMedia?.filename,
            })

            if (!src) {
                return null
            }

            return {
                src,
                title: img.title ?? imageMedia?.alt ?? '',
                description: img.description ?? imageMedia?.caption ?? '',
            }
        })
        .filter((item): item is GalleryItem => Boolean(item))

    const collectionData: GalleryCollectionSummary = {
        id: String(collection.id),
        slug: collection.slug,
        title: collection.title,
        description: collection.description,
        status: collection.status,
    }

    return <AlbumClient collection={collectionData} images={galleryImages} />
}
