import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const projects = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-updatedAt',
    })
    
    return Response.json({
      success: true,
      data: projects.docs,
    })
  } catch (error) {
    console.error('Projects API Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to fetch projects',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()
    
    const project = await payload.create({
      collection: 'projects',
      data: body,
    })
    
    return Response.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Projects POST Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
