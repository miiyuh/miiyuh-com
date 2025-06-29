import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../../payload.config'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const startTime = Date.now();
  try {
    const { slug } = await params
    console.log(`🔍 Blog API: Fetching post with slug "${slug}"`);
    
    const payload = await getPayloadHMR({ config: configPromise })
    console.log(`⚡ Blog API: Payload initialized in ${Date.now() - startTime}ms`);
    
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
    
    console.log(`📊 Blog API: Query completed in ${Date.now() - startTime}ms, found ${posts.docs.length} posts`);
    
    if (posts.docs.length === 0) {
      return Response.json(
        { 
          success: false, 
          error: 'Blog post not found' 
        },
        { status: 404 }
      )
    }

    console.log(`✅ Blog API: Returning post "${posts.docs[0].title}" in ${Date.now() - startTime}ms`);
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
