import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../../payload.config'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayloadHMR({ config: configPromise })
    
    const posts = await payload.find({
      collection: 'blog-posts',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
      limit: 1,
    })
    
    if (posts.docs.length === 0) {
      return Response.json(
        { 
          success: false, 
          error: 'Blog post not found' 
        },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      data: posts.docs[0],
    })
  } catch (error) {
    console.error('Blog Post API Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to fetch blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
