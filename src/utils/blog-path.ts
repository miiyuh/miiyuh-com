// Blog URLs are /blog/:year/:month/:slug, with year/month taken in Malaysia time
// (a post published 2026-02-28T16:00Z lives under /blog/2026/03/).
export function getBlogYearMonth(publishedAt: string | number | Date): [year: string, month: string] {
  const [year, month] = new Date(publishedAt)
    .toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
    .split('-')
  return [year, month]
}

export function getBlogPostPath(slug: string, publishedAt: string | number | Date): string {
  const [year, month] = getBlogYearMonth(publishedAt)
  return `/blog/${year}/${month}/${slug}`
}
