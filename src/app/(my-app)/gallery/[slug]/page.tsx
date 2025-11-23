import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import AlbumClient from './album-client'
import type {
    GalleryCollectionDocument,
    GalleryCollectionSummary,
    GalleryImageDocument,
    GalleryItem,
} from '@/types/gallery'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
        limit: 1,
    })

    const [collection] = collectionDocs as GalleryCollectionDocument[]

    if (!collection) {
        notFound()
    }

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

    const galleryImages: GalleryItem[] = images
        .map((imgDoc) => {
            const imageMedia = typeof imgDoc.image === 'object' ? imgDoc.image : null

            const src = imageMedia?.url ??
                (imageMedia?.filename
                    ? `/api/media/file/${imageMedia.filename}`
                    : undefined)

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

    const collectionData: GalleryCollectionSummary = {
        id: String(collection.id),
        slug: collection.slug,
        title: collection.title,
        description: collection.description,
        status: collection.status,
    }

    return <AlbumClient collection={collectionData} images={galleryImages} />
}
