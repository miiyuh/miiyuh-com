import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@payloadcms/next/getPayloadClient'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    
    const payload = await getPayloadClient()
    
    // If a specific slug is requested, return that post
    if (slug) {
      const post = await payload.find({
        collection: 'posts',
        where: {
          slug: {
            equals: slug,
          },
          status: {
            equals: 'published',
          },
        },
      })
      
      return NextResponse.json(post)
    }
    
    // Otherwise, return all published posts
    const posts = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
    })
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}
