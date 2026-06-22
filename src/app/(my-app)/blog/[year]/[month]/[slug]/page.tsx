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
import BlogPostContent from "./blog-post-content";
import { BlogPostSkeleton } from "./blog-post-skeleton";
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
  if (!post) return { title: "Post Not Found - miiyuh" };

  // Verify the post matches the year/month (using Malaysia timezone)
  const [postYear, postMonth] = new Date(post.publishedAt as string)
    .toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" })
    .split("-");

  if (postYear !== year || postMonth !== month) {
    return { title: "Post Not Found - miiyuh" };
  }

  const title = `${post.title} - miiyuh`;
  const description = post.excerpt || post.seo?.metaDescription || "";
  const canonicalUrl = `https://miiyuh.com/blog/${year}/${month}/${slug}`;

  // Resolve cover image to an absolute URL string
  const coverImageUrl = resolveMediaSrc({
    url: typeof post.coverImage === "object" ? post.coverImage?.url : undefined,
    filename:
      typeof post.coverImage === "object"
        ? post.coverImage?.filename
        : undefined,
  });

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
      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImageUrl ? [coverImageUrl] : undefined,
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

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <main className="relative min-h-screen text-text-primary">
        <div className="relative z-10 mx-auto max-w-4xl px-8 pt-6 pb-16 animate-smooth-slide-up">
          {/* Breadcrumbs */}
          <SimpleBreadcrumb
            items={breadcrumbs.blogPost(year, month, post.title)}
            className="-mx-8 px-8 md:mx-0 md:px-0"
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
            <h1 className="text-4xl tracking-tight sm:text-5xl font-serif text-balance">
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
              <p className="text-md text-secondary font-serif italic">
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
          <footer className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-primary hover:text-text-primary/80 transition-colors"
            >
              <span>←</span>
              <span>back to blog</span>
            </Link>
          </footer>
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