import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function createAdminUser() {
  console.log('👤 Creating admin user...\n')

  // Dynamic imports
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')
  
  const payload = await getPayload({ config })

  try {
    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length > 0) {
      console.log('✅ Admin user already exists!')
      console.log(`   Email: ${existingUsers.docs[0].email}`)
      process.exit(0)
    }

    // Create admin user
    const admin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@miiyuh.com',
        password: 'changeme123', // Change this after first login!
        role: 'admin',
      },
    })

    console.log('Admin user created successfully!')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Password: changeme123`)
    console.log('\nIMPORTANT: Please change the password after first login!')
    console.log(`   Login at: http://localhost:3000/admin\n`)
  } catch (error) {
    console.error('Failed to create admin user:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

createAdminUser()
