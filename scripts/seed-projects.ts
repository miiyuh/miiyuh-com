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

async function seedProjects() {
  console.log('Seeding projects...\n')

  // Dynamic imports after env is loaded
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')
  
  const payload = await getPayload({ config })

  console.log('Connected to Payload CMS\n')

  const projectsData = [
    // Personal Organizations
    {
      name: 'studio shingeki',
      slug: 'shingeki',
      category: 'personal',
      description: 'attack on titan inspired creative works and projects',
      order: 1,
    },
    {
      name: '2alpha',
      slug: '2alpha',
      category: 'personal',
      description: 'development and experimental projects in alpha phase',
      order: 2,
    },
    {
      name: 'miyabi',
      slug: 'miyabi',
      category: 'personal',
      description: 'minecraft builds and architectural creations',
      order: 3,
    },
    // Academic Projects
    {
      name: 'University Projects',
      slug: 'academic',
      category: 'academic',
      description: 'academic coursework and research projects from university',
      icon: '🎓',
      order: 1,
    },
    {
      name: 'Research Papers',
      slug: 'papers',
      category: 'academic',
      description: 'personal research papers and academic writings',
      icon: '📄',
      order: 2,
    },
  ]

  for (const projectData of projectsData) {
    try {
      // Check if project already exists
      const existing = await payload.find({
        collection: 'projects',
        where: {
          slug: {
            equals: projectData.slug,
          },
        },
      })

      if (existing.docs.length > 0) {
        console.log(`Project "${projectData.name}" already exists, skipping...`)
        continue
      }

      await payload.create({
        collection: 'projects',
        data: projectData,
      })

      console.log(`Created project: ${projectData.name}`)
    } catch (error) {
      console.error(`Failed to create project "${projectData.name}":`, error)
    }
  }

  console.log('Projects seeding complete!')
  process.exit(0)
}

seedProjects().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
