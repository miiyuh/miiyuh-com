import path from 'path'
import dotenv from 'dotenv'

// Load environment variables FIRST before any other imports
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Verify critical environment variables
if (!process.env.PAYLOAD_SECRET) {
  console.error('ERROR: PAYLOAD_SECRET is not set in .env.local')
  process.exit(1)
}

if (!process.env.DATABASE_URI) {
  console.error('ERROR: DATABASE_URI is not set in .env.local')
  process.exit(1)
}

console.log('✓ Environment variables loaded successfully')

async function cleanProjects() {
  console.log('Cleaning projects with invalid icon references...\n')

  // Dynamic imports after env is loaded
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')
  
  const payload = await getPayload({ config })

  console.log('Connected to Payload CMS\n')

  try {
    // Access MongoDB directly through Mongoose connection in the adapter
    const mongoAdapter = payload.db
    const connection = mongoAdapter.connection
    
    // Get the projects collection
    const projectsCollection = connection.collection('projects')
    
    // Find and update all projects with string icons
    const result = await projectsCollection.updateMany(
      { icon: { $type: 'string' } },
      { $set: { icon: null } }
    )

    console.log(`Updated ${result.modifiedCount} project(s)`)
    console.log('Cleanup complete!')
    process.exit(0)
  } catch (error) {
    console.error('Cleanup failed:', error)
    process.exit(1)
  }
}

cleanProjects().catch((error) => {
  console.error('Script failed:', error)
  process.exit(1)
})
