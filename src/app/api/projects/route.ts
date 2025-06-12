import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@payloadcms/next/getPayloadClient'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    
    const payload = await getPayloadClient()
    
    // If a specific slug is requested, return that project
    if (slug) {
      const project = await payload.find({
        collection: 'projects',
        where: {
          slug: {
            equals: slug,
          },
          status: {
            equals: 'published',
          },
        },
      })
      
      return NextResponse.json(project)
    }
    
    // Otherwise, return all published projects
    const projects = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 })
  }
}
