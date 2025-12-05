import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const seedAboutEntries = async () => {
  // Dynamic imports after env is loaded
  const config = (await import('../payload.config.js')).default
  const { getPayload } = await import('payload')
  
  const payload = await getPayload({ config })

  console.log('🌱 Seeding about entries...')

  // Clear existing entries
  const existing = await payload.find({
    collection: 'about-entries',
    limit: 100,
  })

  for (const entry of existing.docs) {
    await payload.delete({
      collection: 'about-entries',
      id: entry.id,
    })
  }

  console.log('🗑️ Cleared existing entries')

  // Education entries
  const educationEntries = [
    {
      type: 'education' as const,
      title: 'Management and Science University',
      subtitle: 'Bachelor in Computer Forensics (Hons)',
      description: 'Specializing in digital investigation, cyber security, and data recovery.',
      startDate: '09/2024',
      endDate: 'Present',
      isCurrent: true,
      tags: [
        { tag: 'Digital Forensics' },
        { tag: 'Cyber Law' },
        { tag: 'Network Security' },
        { tag: 'Cryptography' },
        { tag: 'Malware Analysis' },
      ],
      order: 0,
    },
    {
      type: 'education' as const,
      title: 'Management and Science University',
      subtitle: 'Diploma in Computer Forensics',
      description: 'Built a strong foundation in programming, mathematics, and system architecture.',
      startDate: '06/2022',
      endDate: '08/2024',
      isCurrent: false,
      tags: [],
      order: 1,
    },
  ]

  // Experience entries
  const experienceEntries = [
    {
      type: 'experience' as const,
      title: 'Freelance Developer',
      subtitle: 'Self-Employed',
      description: 'Developing custom web solutions for clients using Next.js and modern web technologies. Focusing on performance, accessibility, and unique design systems.',
      startDate: '01/2023',
      endDate: 'Present',
      isCurrent: true,
      tags: [
        { tag: 'React' },
        { tag: 'Next.js' },
        { tag: 'Tailwind CSS' },
        { tag: 'Framer Motion' },
      ],
      order: 0,
    },
    {
      type: 'experience' as const,
      title: 'Open Source Contributor',
      subtitle: 'Community',
      description: 'Contributed to various open-source projects, fixing bugs and improving documentation. Learned the importance of code quality and collaboration.',
      startDate: '06/2022',
      endDate: '12/2023',
      isCurrent: false,
      tags: [],
      order: 1,
    },
  ]

  // Volunteering entries
  const volunteeringEntries = [
    {
      type: 'volunteering' as const,
      title: 'Community Tech Support',
      subtitle: '',
      description: 'Helping local communities bridge the digital divide through workshops and technical assistance.',
      startDate: '03/2023',
      endDate: 'Present',
      isCurrent: true,
      tags: [],
      order: 0,
    },
    {
      type: 'volunteering' as const,
      title: 'Environmental Initiatives',
      subtitle: '',
      description: 'Participating in local clean-up drives and awareness campaigns for sustainable living.',
      startDate: '01/2022',
      endDate: 'Present',
      isCurrent: true,
      tags: [],
      order: 1,
    },
  ]

  const allEntries = [...educationEntries, ...experienceEntries, ...volunteeringEntries]

  for (const entry of allEntries) {
    await payload.create({
      collection: 'about-entries',
      data: entry,
    })
    console.log(`✅ Created: ${entry.title} (${entry.type})`)
  }

  console.log(`\n🎉 Successfully seeded ${allEntries.length} about entries!`)
  process.exit(0)
}

seedAboutEntries().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
