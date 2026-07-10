import type { Metadata } from "next";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Fragment, Suspense } from "react";

import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { breadcrumbs } from "@/config/breadcrumbs";
import { CopyLinkButton } from "@/components/ui/copy-link-button";
import { Separator } from "@/components/ui/separator";
import { RefreshRouteOnSave } from "@/components/live-preview";
import { JsonLd } from "@/components/seo/json-ld";
import BlogPostContent from "./blog-post-content";
import { BlogPostSkeleton } from "./blog-post-skeleton";
import { BlogPostFooter } from "./blog-post-footer";
import type { BlogPostDocument } from "@/types/blog";
import { resolveMediaSrc } from "@/utils/media";
import { extractTocFromLexical } from "@/utils/extract-toc";
import { renderLexicalContent } from "@/utils/lexical-renderer";
import { getServerLocale } from "@/lib/locale-server";
import type { LocaleCode } from "@/lib/locale";

// ISR: Revalidate every 60 seconds for faster repeat visits
export const revalidate = 60;

type PageParams = { year: string; month: string; slug: string };

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
  const locale = await getServerLocale();

  const post = await getCachedBlogPost(slug, locale);
  if (!post) return { title: "page not found - miiyuh.com" };

  // Verify the post matches the year/month (using Malaysia timezone)
  const [postYear, postMonth] = new Date(post.publishedAt as string)
    .toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" })
    .split("-");

  if (postYear !== year || postMonth !== month) {
    return { title: "page not found - miiyuh.com" };
  }

  const title = post.seo?.metaTitle || `${post.title} - miiyuh.com`;
  const description = post.seo?.metaDescription || post.excerpt || `read ${post.title}`;
  const canonicalUrl = `https://miiyuh.com/blog/${year}/${month}/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
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

async function PageContent({ params }: PageProps) {
  const { year, month, slug } = await params;
  const locale = await getServerLocale();

  const post = await getCachedBlogPost(slug, locale);
  if (!post) notFound();

  // Verify the post matches the year/month in the URL (using Malaysia timezone)
  const [postYear, postMonth] = new Date(post.publishedAt as string)
    .toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" })
    .split("-");

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
  const canonicalUrl = `https://miiyuh.com/blog/${year}/${month}/${slug}`;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt || `read ${post.title}`,
    url: canonicalUrl,
    datePublished: publishedAtDate ? publishedAtDate.toISOString() : undefined,
    dateModified: publishedAtDate ? publishedAtDate.toISOString() : undefined,
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
        <div className="relative z-10 mx-auto max-w-4xl px-8 md:px-32 lg:px-8 pt-6 pb-16 animate-smooth-slide-up">
          {/* Breadcrumbs */}
          <SimpleBreadcrumb
            items={breadcrumbs.blogPost(year, month, post.title)}
            className="-mx-8 px-8 md:-mx-32 md:px-32 lg:mx-0 lg:px-0"
            staticFrom="lg"
            trailing={<CopyLinkButton />}
          />

          {/* Cover Image */}
          {coverImage && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg relative">
              <Image
                src={coverImage}
                alt={post.title}
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
                  {publishedAtDate.toLocaleDateString("en-CA", {
                    timeZone: "Asia/Kuala_Lumpur",
                  })}
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
              <p className="text-md text-secondary italic" style={{ fontFamily: 'var(--font-noto-sans), sans-serif' }}>
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

function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <PageContent params={params} />
    </Suspense>
  );
}

export default Page;