import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import type { GalleryCollectionDocument } from '../src/types/gallery.js'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function exportGallery() {
  console.log('Starting gallery export process...\n')

  // Dynamic imports
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')

  const payload = await getPayload({ config })

  try {
    // Fetch all gallery collections with embedded images (depth: 2 to get full media objects)
    const { docs: collections } = await payload.find({
      collection: 'gallery-collections',
      limit: 100,
      depth: 2, // Include full media objects in images array
    })

    console.log(`Found ${collections.length} gallery collections\n`)

    // Build export data structure from embedded images
    const exportData = {
      exportedAt: new Date().toISOString(),
      collections: collections.map((col) => ({
        id: col.id,
        title: col.title,
        slug: col.slug,
        description: col.description,
        status: col.status,
        displayOrder: col.displayOrder,
      })),
      images: (collections as GalleryCollectionDocument[]).flatMap((col) =>
        (col.images ?? []).map((img) => {
          const media = typeof img.image === 'object' ? img.image : null
          return {
            id: img.id || `${col.id}-${img.title}`,
            title: img.title,
            description: img.description,
            galleryCollectionId: col.id,
            collectionSlug: col.slug,
            displayOrder: img.displayOrder,
            published: img.published,
            media: media
              ? {
                  id: media.id,
                  url: media.url,
                  filename: media.filename,
                  alt: media.alt,
                  caption: media.caption,
                }
              : null,
          }
        }),
      ),
    }

    // Write to file
    const outputPath = path.resolve(dirname, '../gallery-export.json')
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2))

    console.log(`\nGallery data exported to: ${outputPath}`)
    console.log(`   - ${exportData.collections.length} collections`)
    console.log(`   - ${exportData.images.length} images`)

    // Also create a summary grouped by collection
    const groupedByCollection: Record<string, unknown[]> = {}
    for (const img of exportData.images) {
      const colId = String(img.galleryCollectionId)
      if (!groupedByCollection[colId]) {
        groupedByCollection[colId] = []
      }
      groupedByCollection[colId].push(img)
    }

    console.log('\nSummary by collection:')
    for (const col of exportData.collections) {
      const imageCount = groupedByCollection[String(col.id)]?.length || 0
      console.log(`   - ${col.title}: ${imageCount} images`)
    }
  } catch (error) {
    console.error('Export failed:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run the export function
exportGallery()
