import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import type { GalleryCollectionDocument, GalleryImageItem } from '../src/types/gallery.js'

// Load environment variables
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
dotenv.config({ path: path.resolve(dirname, '../.env.local') })

async function migrateGallery() {
  console.log('Starting gallery migration process...\n')

  // Dynamic imports
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')

  const payload = await getPayload({ config })

  try {
    // Fetch all gallery collections
    const { docs: collections } = await payload.find({
      collection: 'gallery-collections',
      limit: 100,
      depth: 0,
    })

    console.log(`Found ${collections.length} gallery collections\n`)

    let totalMigrated = 0

    // Process each collection
    for (const collection of collections as GalleryCollectionDocument[]) {
      console.log(`\n📂 Migrating collection: ${collection.title} (ID: ${collection.id})`)

      // Fetch all images that belong to this collection from the old gallery-images table
      const { docs: images } = await payload.find({
        collection: 'gallery-images',
        where: {
          galleryCollection: {
            equals: collection.id,
          },
        },
        depth: 1, // Include media relationship
        limit: 1000,
      })

      console.log(`   Found ${images.length} images to migrate`)

      if (images.length === 0) {
        console.log(`   ✓ No images to migrate`)
        continue
      }

      // Transform old images to new embedded format
      const migratedImages: GalleryImageItem[] = (images as unknown[])
        .sort(
          (a: unknown, b: unknown) =>
            ((a as Record<string, unknown>).displayOrder as number) ?? 0 -
            (((b as Record<string, unknown>).displayOrder as number) ?? 0),
        )
        .map((img: unknown) => {
          const image = img as Record<string, unknown>
          const mediaObj = image.image as Record<string, unknown>
          return {
            image: String(mediaObj?.id || image.image),
            title: (image.title as string) || '',
            description: (image.description as string) || null,
            published: (image.published as boolean) !== false,
            displayOrder: (image.displayOrder as number) ?? 0,
          }
        })

      // Update the collection with the embedded images array
      try {
        await payload.update({
          collection: 'gallery-collections',
          id: collection.id,
          data: {
            images: migratedImages,
          },
        })
        console.log(`   ✓ Migrated ${migratedImages.length} images to ${collection.title}`)
        totalMigrated += migratedImages.length
      } catch (error) {
        console.error(
          `   ✗ Error migrating ${collection.title}:`,
          error instanceof Error ? error.message : String(error),
        )
      }
    }

    console.log(`\n✅ Migration completed!`)
    console.log(`   Total images migrated: ${totalMigrated}`)
    console.log(
      `\n   Next steps:`,
    )
    console.log(`   1. Verify the migrated data in the admin panel`)
    console.log(`   2. Once verified, you can delete the old gallery-images collection`)
    console.log(`   3. Run: bun run scripts/clear-gallery.ts (this will only clear media now)`)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run the migration
migrateGallery()
