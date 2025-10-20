import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function clearGallery() {
  console.log('🧹 Clearing gallery data...\n')

  // Dynamic imports
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')
  
  const payload = await getPayload({ config })

  try {
    // Delete all gallery images
    const galleryImages = await payload.find({
      collection: 'gallery-images',
      limit: 1000,
    })
    
    for (const doc of galleryImages.docs) {
      await payload.delete({
        collection: 'gallery-images',
        id: doc.id,
      })
    }
    console.log(`✅ Deleted ${galleryImages.docs.length} gallery images`)

    // Delete all media
    const media = await payload.find({
      collection: 'media',
      limit: 1000,
    })
    
    for (const doc of media.docs) {
      await payload.delete({
        collection: 'media',
        id: doc.id,
      })
    }
    console.log(`✅ Deleted ${media.docs.length} media files`)

    // Delete all gallery collections
    const collections = await payload.find({
      collection: 'gallery-collections',
      limit: 1000,
    })
    
    for (const doc of collections.docs) {
      await payload.delete({
        collection: 'gallery-collections',
        id: doc.id,
      })
    }
    console.log(`✅ Deleted ${collections.docs.length} gallery collections`)

    console.log('\n🎉 Gallery cleared successfully!')
  } catch (error) {
    console.error('❌ Clear failed:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

clearGallery()
