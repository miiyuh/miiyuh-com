import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const posts = await payload.find({
      collection: 'blog-posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
    })
    
    return Response.json({
      success: true,
      data: posts.docs,
    })
  } catch (error) {
    console.error('Blog API Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to fetch blog posts',
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
    
    const post = await payload.create({
      collection: 'blog-posts',
      data: body,
    })
    
    return Response.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('Blog POST Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to create blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
