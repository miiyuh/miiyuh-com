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
      limit: 20,
    })

    // Return detailed info about featured status
    const postsInfo = posts.docs.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      featured: post.featured,
      featuredType: typeof post.featured,
      publishedDate: post.publishedDate,
    }))
    
    return Response.json({
      success: true,
      data: postsInfo,
      featuredCount: posts.docs.filter(post => post.featured === true).length,
    })
  } catch (error) {
    console.error('Debug API Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to fetch debug info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
