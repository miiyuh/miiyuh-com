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
    // Side projects
    {
      name: 'Miiyuh Portfolio v2',
      slug: 'miiyuh-portfolio-v2',
      category: 'side-project',
      description: 'Next.js 16 + Tailwind v4 personal site with payload CMS, interactive animations, and gallery system.',
      order: 1,
      projectDetails: {
        techStack: [{ tech: 'Next.js' }, { tech: 'Tailwind' }, { tech: 'Payload' }, { tech: 'Bun' }],
        status: 'active',
        githubUrl: 'https://github.com/miiyuh/miiyuh-com',
        liveUrl: 'https://miiyuh.com',
      },
    },
    {
      name: 'Shingeki Studio',
      slug: 'shingeki-studio',
      category: 'side-project',
      description: 'AOT-inspired creative studio site with motion graphics and lore sections.',
      order: 2,
      projectDetails: {
        techStack: [{ tech: 'Next.js' }, { tech: 'GSAP' }, { tech: 'Three.js' }],
        status: 'in-development',
        githubUrl: 'https://github.com/miiyuh/shingeki',
      },
    },
    {
      name: 'Miyabi Builds',
      slug: 'miyabi-builds',
      category: 'side-project',
      description: 'Minecraft architecture showcase with shaders gallery and build blueprints.',
      order: 3,
      projectDetails: {
        techStack: [{ tech: 'Next.js' }, { tech: 'LightGallery' }, { tech: 'Payload' }],
        status: 'active',
        liveUrl: 'https://miyabi.example.com',
      },
    },
    {
      name: '2alpha Utilities',
      slug: '2alpha-utilities',
      category: 'side-project',
      description: 'A bundle of small developer utilities (CLI + UI) for quick experiments.',
      order: 4,
      projectDetails: {
        techStack: [{ tech: 'TypeScript' }, { tech: 'Bun' }, { tech: 'CLI' }],
        status: 'archived',
        githubUrl: 'https://github.com/miiyuh/2alpha',
      },
    },

    // University projects
    {
      name: 'Library Management System',
      slug: 'library-management',
      category: 'university-project',
      description: 'Full-stack system for book lending with role-based access and overdue tracking.',
      order: 1,
      universityDetails: {
        course: 'Database Systems',
        semester: 'Fall 2024',
        grade: 'A-',
      },
    },
    {
      name: 'LockMe Encryption Suite',
      slug: 'lockme-encryption',
      category: 'university-project',
      description: 'AES/RSA hybrid encryption lab with UI visualizing key exchange.',
      order: 2,
      universityDetails: {
        course: 'Network Security',
        semester: 'Spring 2024',
        grade: 'A',
      },
    },
    {
      name: 'Health & Wellbeing Tech',
      slug: 'health-wellbeing-tech',
      category: 'university-project',
      description: 'UX case study exploring wearable data for wellbeing nudges.',
      order: 3,
      universityDetails: {
        course: 'HCI',
        semester: 'Fall 2023',
        grade: 'A',
      },
    },

    // Research papers
    {
      name: 'Ethical AI in Open Source',
      slug: 'ethical-ai-open-source',
      category: 'research-paper',
      description: 'Exploring governance models for responsible AI contributions.',
      order: 1,
      paperDetails: {
        author: 'miiyuh',
        year: '2024',
        abstract: 'A survey of community-led guardrails for AI in OSS.',
        keywords: [{ keyword: 'AI' }, { keyword: 'Open Source' }, { keyword: 'Governance' }],
        pages: 14,
      },
    },
    {
      name: 'Community Responsibility in Tech',
      slug: 'community-responsibility-tech',
      category: 'research-paper',
      description: 'On the social contract between developers and users.',
      order: 2,
      paperDetails: {
        author: 'miiyuh',
        year: '2023',
        abstract: 'Case studies of community stewardship in digital platforms.',
        keywords: [{ keyword: 'Community' }, { keyword: 'Ethics' }],
        pages: 11,
      },
    },
    {
      name: 'Sustainable Tech Futures',
      slug: 'sustainable-tech',
      category: 'research-paper',
      description: 'Balancing performance and sustainability in modern stacks.',
      order: 3,
      paperDetails: {
        author: 'miiyuh',
        year: '2022',
        abstract: 'Evaluating sustainable design choices for web apps.',
        keywords: [{ keyword: 'Sustainability' }, { keyword: 'Web' }],
        pages: 9,
      },
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
