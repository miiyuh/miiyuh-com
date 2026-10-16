import type { Metadata } from "next";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Link from "@/components/locale-link";
import Image from "next/image";
import { Fragment } from "react";

import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { breadcrumbs } from "@/config/breadcrumbs";
import { CopyLinkButton } from "@/components/ui/copy-link-button";
import { Separator } from "@/components/ui/separator";
import { RefreshRouteOnSave } from "@/components/live-preview";
import { JsonLd } from "@/components/seo/json-ld";
import BlogPostContent from "./blog-post-content";
import { BlogPostFooter } from "./blog-post-footer";
import type { BlogPostDocument } from "@/types/blog";
import { resolveMediaSrc } from "@/utils/media";
import { extractTocFromLexical } from "@/utils/extract-toc";
import { renderLexicalContent } from "@/utils/lexical-renderer";
import { pageAlternates, resolveLocale, type LocaleCode } from "@/lib/locale";
import { getBlogYearMonth } from "@/utils/blog-path";
import { formatPostDate } from "@/utils/format-date";

// ISR: Revalidate every 60 seconds for faster repeat visits
export const revalidate = 60;

// No paths prebuilt at deploy: each page renders on first visit, then is
// cached and revalidated like the rest (an empty list still opts into ISR).
export async function generateStaticParams() {
  return [];
}

type PageParams = { locale: string; year: string; month: string; slug: string };

type PageProps = {
  params: Promise<PageParams>;
};

/**
 * Fetch and cache a single published blog post by slug.
 * Shared by generateMetadata and PageContent to avoid duplicate Payload queries.
 */
const getCachedBlogPost = unstable_cache(
  async (slug: string, locale: LocaleCode): Promise<BlogPostDocument | undefined> => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "blog-posts",
      locale,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
      depth: 1,
      limit: 1,
    });
    return (docs[0] as BlogPostDocument) ?? undefined;
  },
  ["blog-post-by-slug-v2"],
  { revalidate: 60, tags: ["blog-posts"] },
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const locale = await resolveLocale(params);

  const post = await getCachedBlogPost(slug, locale);
  if (!post) return { title: "page not found - miiyuh.com" };

  // Verify the post matches the year/month (using Malaysia timezone)
  const [postYear, postMonth] = getBlogYearMonth(post.publishedAt as string);

  if (postYear !== year || postMonth !== month) {
    return { title: "page not found - miiyuh.com" };
  }

  const title = post.seo?.metaTitle || `${post.title} - miiyuh.com`;
  const description = post.seo?.metaDescription || post.excerpt || `read ${post.title}`;
  const alternates = pageAlternates(`/blog/${year}/${month}/${slug}`, locale);
  const canonicalUrl = alternates.canonical;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// notFound() must run before any Suspense boundary renders, otherwise the
// response streams with a committed 200 status instead of a real 404.
async function Page({ params }: PageProps) {
  const { year, month, slug } = await params;
  const locale = await resolveLocale(params);

  const post = await getCachedBlogPost(slug, locale);
  if (!post) notFound();

  // Verify the post matches the year/month in the URL (using Malaysia timezone)
  const [postYear, postMonth] = getBlogYearMonth(post.publishedAt as string);

  if (postYear !== year || postMonth !== month) {
    notFound();
  }

  // Transform cover image
  const coverImage = resolveMediaSrc({
    url: typeof post.coverImage === "object" ? post.coverImage?.url : undefined,
    filename:
      typeof post.coverImage === "object"
        ? post.coverImage?.filename
        : undefined,
  });

  const publishedAtDate = post.publishedAt ? new Date(post.publishedAt) : null;
  const canonicalUrl = pageAlternates(`/blog/${year}/${month}/${slug}`, locale).canonical;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt || `read ${post.title}`,
    url: canonicalUrl,
    datePublished: publishedAtDate ? publishedAtDate.toISOString() : undefined,
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : publishedAtDate?.toISOString(),
    author: {
      "@type": "Person",
      name: "miiyuh",
      url: "https://miiyuh.com",
    },
    image: coverImage || undefined,
  };

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <JsonLd data={blogPostingJsonLd} />
      <main className="relative min-h-screen text-text-primary">
        <div className="relative z-10 mx-auto max-w-4xl px-8 md:px-16 lg:px-8 pt-6 pb-16 animate-page-in">
          {/* Breadcrumbs */}
          <SimpleBreadcrumb
            items={breadcrumbs.blogPost(year, month, post.title)}
            className="-mx-8 px-8 md:-mx-16 md:px-16 lg:mx-0 lg:px-0"
            staticFrom="lg"
            trailing={<CopyLinkButton />}
          />

          {/* Cover Image */}
          {coverImage && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg relative">
              <Image
                src={coverImage}
                alt={(typeof post.coverImage === "object" && post.coverImage?.alt) || post.title}
                fill
                className="object-cover"
                priority
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8 space-y-4">
            <h1 className="text-4xl tracking-tight sm:text-5xl font-notch text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              {publishedAtDate && (
                <time dateTime={publishedAtDate.toISOString()}>
                  {formatPostDate(publishedAtDate, locale)}
                </time>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagItem, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${encodeURIComponent(tagItem?.tag ?? "")}`}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/15 transition-colors duration-200"
                    >
                      {tagItem?.tag ?? "untagged"}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {post.excerpt && (
              <p className="text-base text-text-secondary italic font-paper-mono font-[450]">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Separator after excerpt */}
          <Separator className="my-8 bg-white/10" />

          {/* Post Content */}
          <BlogPostContent
            htmlContent={renderLexicalContent(post.content ?? null)}
            toc={extractTocFromLexical(post.content)}
          />

          {/* Back to Blog */}
          <BlogPostFooter />
        </div>
      </main>
    </Fragment>
  );
}

export default Page;
