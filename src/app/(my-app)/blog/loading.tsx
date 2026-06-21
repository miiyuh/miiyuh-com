import BlogPostsSkeleton from './blog-posts-skeleton'

export default function BlogLoading() {
  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen">
      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 min-h-[70vh]" style={{ paddingTop: '24px' }}>
        <BlogPostsSkeleton />
      </section>
    </main>
  )
}
