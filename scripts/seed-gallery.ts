import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function seedGallery() {
  console.log('Starting gallery seed process...\n')

  // Dynamic imports
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')

  const payload = await getPayload({ config })

  // Read the existing gallery.json
  const galleryJsonPath = path.resolve(dirname, '../public/gallery.json')
  const galleryData = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf-8'))

  console.log('Loaded gallery.json with', Object.keys(galleryData).length, 'collections\n')

  // Collection mapping
  const collectionMappings = {
    photos_2025jp: {
      title: '2025 Japan Trip',
      slug: '2025-japan-trip',
      description: 'photos from our 2025 trip to Japan',
    },
    artworks_2022: {
      title: '2022 Artworks',
      slug: 'artworks-2022',
      description: 'digital art created in 2022',
    },
    artworks_2023: {
      title: '2023 Artworks',
      slug: 'artworks-2023',
      description: 'digital art created in 2023',
    },
  }

  try {
    // Process each gallery collection
    for (const [key, items] of Object.entries(galleryData)) {
      const collectionInfo = collectionMappings[key as keyof typeof collectionMappings]
      if (!collectionInfo) {
        console.log(`Skipping unknown collection: ${key}`)
        continue
      }

      console.log(`\nProcessing collection: ${collectionInfo.title}`)

      // First, upload all images and collect their IDs
      const uploadedImages: Array<{
        image: string
        title: string
        description: string
        displayOrder: number
        published: boolean
      }> = []

      let imageOrder = 0
      for (const item of items as Array<{ src: string; title: string; description: string }>) {
        const imagePath = path.resolve(dirname, '../public', item.src.substring(1)) // Remove leading /

        // Check if image exists
        if (!fs.existsSync(imagePath)) {
          console.log(`Image not found: ${item.src}`)
          continue
        }

        try {
          // Upload the image to Media collection
          const imageBuffer = fs.readFileSync(imagePath)
          const fileName = path.basename(item.src)

          const mediaDoc = await payload.create({
            collection: 'media',
            data: {
              alt: item.title,
              caption: item.description,
            },
            file: {
              data: imageBuffer,
              mimetype: `image/${path.extname(fileName).substring(1)}`,
              name: fileName,
              size: imageBuffer.length,
            },
          })

          console.log(`Uploaded media: ${fileName} (ID: ${mediaDoc.id})`)

          // Add to images array for the collection
          uploadedImages.push({
            image: String(mediaDoc.id),
            title: item.title,
            description: item.description,
            displayOrder: imageOrder++,
            published: true,
          })
        } catch (error) {
          console.error(
            `Error processing ${item.src}:`,
            error instanceof Error ? error.message : String(error),
          )
        }
      }

      // Create GalleryCollection with embedded images array
      const galleryCollection = await payload.create({
        collection: 'gallery-collections',
        data: {
          title: collectionInfo.title,
          slug: collectionInfo.slug,
          description: collectionInfo.description,
          displayOrder: Object.keys(collectionMappings).indexOf(key),
          status: 'published',
          images: uploadedImages,
        },
      })

      console.log(
        `Created collection: ${galleryCollection.id} with ${uploadedImages.length} images`,
      )
      console.log(`Completed collection: ${collectionInfo.title}`)
    }

    console.log('\nGallery seeding completed successfully!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run the seed function
seedGallery()
