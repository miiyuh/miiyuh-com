import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import BlogClient from './blog-client'
import type { BlogPostCard, BlogPostDocument } from '@/types/blog'
import { resolveMediaSrc } from '@/utils/media'

export const metadata = {
  title: 'blog - miiyuh',
  description: 'thoughts, stories, and ideas',
}

// Use dynamic rendering to avoid Server Action caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

const POSTS_PER_PAGE = 9

type TagOption = {
  value: string
  label: string
}

type SearchParams = Record<string, string | string[] | undefined>

type PageProps = {
  searchParams?: Promise<SearchParams>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const payload = await getPayload({ config })

  const resolvedSearchParams = searchParams ? await searchParams : {}
  const rawSearch = resolvedSearchParams.search
  const searchQuery = typeof rawSearch === 'string' ? rawSearch.trim() : ''

  const rawTagParam = resolvedSearchParams.tag
  const selectedTags = Array.isArray(rawTagParam)
    ? rawTagParam.map((tag) => tag?.toString()).filter((t) => t && t.trim().length > 0) as string[]
    : typeof rawTagParam === 'string' && rawTagParam.trim().length > 0
      ? [rawTagParam]
      : []

  const rawPageParam = resolvedSearchParams.page
  const parsedPage = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam
  const requestedPage = Number.parseInt(parsedPage ?? '1', 10)
  let currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  const filterConditions: Record<string, unknown>[] = [
    {
      _status: {
        equals: 'published',
      },
    },
  ]

  if (selectedTags.length > 0) {
    filterConditions.push({
      or: selectedTags.map((tag) => ({
        'tags.tag': {
          equals: tag,
        },
      })),
    })
  }

  if (searchQuery) {
    filterConditions.push({
      or: [
        {
          title: {
            like: searchQuery,
          },
        },
        {
          excerpt: {
            like: searchQuery,
          },
        },
        {
          'tags.tag': {
            like: searchQuery,
          },
        },
      ],
    })
  }

  const executePostsQuery = (page: number) =>
    payload.find({
      collection: 'posts',
      where: {
        and: filterConditions as Where[],
      },
      depth: 1,
      sort: '-publishedAt',
      limit: POSTS_PER_PAGE,
      page,
    })

  let postsQuery = await executePostsQuery(currentPage)
  let totalPages = postsQuery.totalPages ?? 0

  if (totalPages > 0 && currentPage > totalPages) {
    currentPage = totalPages
    postsQuery = await executePostsQuery(currentPage)
    totalPages = postsQuery.totalPages ?? totalPages
  }

  const posts = postsQuery.docs as BlogPostDocument[]

  const transformedPosts: BlogPostCard[] = posts.map((post) => {
    const coverImageData =
      typeof post.coverImage === 'object' && post.coverImage ? post.coverImage : null

    const coverImageUrl = resolveMediaSrc({
      url: coverImageData?.url,
      filename: coverImageData?.filename,
    })

    const coverImage = coverImageUrl
      ? {
          url: coverImageUrl,
          alt: coverImageData?.alt ?? post.title,
          caption: coverImageData?.caption ?? undefined,
        }
      : undefined

    return {
      id: String(post.id),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? '',
      coverImage: coverImage?.url ? coverImage : undefined,
      publishedAt: post.publishedAt ?? new Date().toISOString(),
      tags: post.tags?.map((tag) => ({ tag: tag?.tag ?? '' })) ?? [],
    }
  })

  const { docs: tagDocs } = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 0,
    pagination: false,
    select: {
      tags: true,
    },
  })

  const tagOptionsMap = new Map<string, TagOption>()

  ;(tagDocs as Pick<BlogPostDocument, 'tags'>[]).forEach((doc) => {
    doc.tags?.forEach((tag) => {
      const rawValue = tag?.tag
      if (!rawValue || rawValue.trim().length === 0) return

      if (!tagOptionsMap.has(rawValue)) {
        const trimmedValue = rawValue.trim()
        tagOptionsMap.set(rawValue, {
          value: trimmedValue,
          label: trimmedValue || rawValue,
        })
      }
    })
  })

  const availableTags = Array.from(tagOptionsMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  )

  const pagination = {
    page: postsQuery.page ?? currentPage,
    totalPages: totalPages || (posts.length > 0 ? 1 : 0),
    totalDocs: postsQuery.totalDocs ?? posts.length,
    pageSize: POSTS_PER_PAGE,
  }

  return (
    <BlogClient
      posts={transformedPosts}
      availableTags={availableTags}
      selectedTags={selectedTags}
      searchQuery={searchQuery}
      pagination={pagination}
    />
  )
}
