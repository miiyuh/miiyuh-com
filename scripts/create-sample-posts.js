// Sample blog posts creation script
// This creates sample posts via the Sanity API

console.log('📝 Creating sample blog posts...')
console.log('Please create these posts manually in Sanity Studio at http://localhost:3000/studio')
console.log('')

const samplePosts = [
  {
    title: 'My Thoughts on Attack on Titan Season 4',
    slug: 'attack-on-titan-season-4-thoughts',
    excerpt: 'After watching the final season of Attack on Titan, I have so many thoughts about the ending and Eren\'s character development.',
    category: 'Attack on Titan',
    publishedAt: '2024-01-15',
    readTime: 3,
    featured: true,
    content: `Attack on Titan has been an incredible journey, and Season 4 brought everything to a close in ways I never expected.

Eren's transformation from a hopeful protagonist to someone driven by such complex motivations was masterfully written. The way Isayama handled the moral ambiguity of the story really made me question what it means to be free.

What are your thoughts on the ending? I'd love to discuss this more!`
  },
  {
    title: 'Photography: Capturing Urban Life',
    slug: 'urban-photography-thoughts',
    excerpt: 'Street photography has taught me to see the world differently. Here are some thoughts on capturing authentic moments.',
    category: 'Photography',
    publishedAt: '2024-02-01',
    readTime: 2,
    featured: false,
    content: `There's something magical about street photography - the way it captures fleeting moments that tell entire stories.

I've been experimenting with different techniques lately, focusing on natural light and genuine expressions. The key is patience and being ready for those perfect moments.`
  },
  {
    title: 'Building This Blog with Next.js and Sanity',
    slug: 'building-blog-nextjs-sanity',
    excerpt: 'A behind-the-scenes look at how I built this blog using Next.js 15 and Sanity CMS.',
    category: 'Coding',
    publishedAt: '2024-03-01',
    readTime: 5,
    featured: false,
    content: `I recently rebuilt my blog using Next.js 15 and Sanity CMS, and I wanted to share the process and why I made these technology choices.

Next.js 15 with Turbopack provides incredible performance, and Sanity gives me the flexibility to write about diverse topics - from anime analysis to photography techniques.

The combination of Sanity's powerful content management capabilities with Next.js's performance makes for a perfect blogging platform.`
  }
]

console.log('Sample Posts to Create:')
console.log('======================')
samplePosts.forEach((post, index) => {
  console.log(`${index + 1}. ${post.title}`)
  console.log(`   Slug: ${post.slug}`)
  console.log(`   Category: ${post.category}`)
  console.log(`   Excerpt: ${post.excerpt}`)
  console.log(`   Published: ${post.publishedAt}`)
  console.log(`   Read Time: ${post.readTime} minutes`)
  console.log(`   Featured: ${post.featured}`)
  console.log('   ---')
})

console.log('')
console.log('📍 Instructions:')
console.log('1. Open Sanity Studio: http://localhost:3000/studio')
console.log('2. Create new "Post" documents with the above information')
console.log('3. Use the content provided for each post')
console.log('4. Make sure to set the published date and select the correct category')
console.log('5. Publish each post when ready')
console.log('')
console.log('✅ Once posts are created, visit http://localhost:3000/blog to see them!')
