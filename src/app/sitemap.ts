import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { getAllForms } from "@/utils/forms";
import { slugify } from "@/utils/slugify";
import { getBlogPostPath } from "@/utils/blog-path";
import { LOCALE_CODES, localeAlternates } from "@/lib/locale";

const baseUrl = "https://miiyuh.com";

type SitemapEntry = MetadataRoute.Sitemap[number];

// One entry per locale (/blog, /ms/blog), each listing every language version
function withLocaleAlternates(path: string, lastModified: Date, changeFrequency: SitemapEntry["changeFrequency"], priority: number): SitemapEntry[] {
  const languages = localeAlternates(path, baseUrl);
  return LOCALE_CODES.map((locale) => ({
    url: languages[locale],
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const buildTime = new Date();

  const [blogPosts, projects, gallery, privacyPolicy, termsOfService] = await Promise.all([
    payload
      .find({
        collection: "blog-posts",
        limit: 1000,
        depth: 0,
        pagination: false,
        where: {
          _status: { equals: "published" },
        },
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "projects",
        limit: 1000,
        depth: 0,
        pagination: false,
        where: {
          _status: { equals: "published" },
        },
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "gallery-collections",
        limit: 1000,
        depth: 0,
        pagination: false,
        where: {
          status: { equals: "published" },
        },
      })
      .catch(() => ({ docs: [] })),
    payload
      .findGlobal({ slug: "privacy-policy", depth: 0 })
      .catch(() => null),
    payload
      .findGlobal({ slug: "terms-of-service", depth: 0 })
      .catch(() => null),
  ]);

  const surveys = await getAllForms().catch(() => []);

  const entries: MetadataRoute.Sitemap = [
    ...withLocaleAlternates("/", buildTime, "weekly", 1.0),
    ...withLocaleAlternates(`/gallery`, buildTime, "weekly", 0.8),
    ...withLocaleAlternates(`/projects`, buildTime, "weekly", 0.8),
    ...withLocaleAlternates(`/blog`, buildTime, "weekly", 0.8),
    ...withLocaleAlternates(`/surveys`, buildTime, "monthly", 0.5),
    ...withLocaleAlternates(
      `/privacy-policy`,
      new Date((privacyPolicy as { updatedAt?: string } | null)?.updatedAt || buildTime),
      "yearly",
      0.3,
    ),
    ...withLocaleAlternates(
      `/terms-of-service`,
      new Date((termsOfService as { updatedAt?: string } | null)?.updatedAt || buildTime),
      "yearly",
      0.3,
    ),
  ];

  for (const post of blogPosts.docs as Array<{
    slug?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
  }>) {
    if (!post.slug) continue;
    entries.push(
      ...withLocaleAlternates(
        getBlogPostPath(post.slug, post.publishedAt || post.createdAt || Date.now()),
        new Date(post.updatedAt || Date.now()),
        "monthly",
        0.6,
      ),
    );
  }

  for (const project of projects.docs as Array<{
    slug?: string;
    updatedAt?: string;
  }>) {
    if (!project.slug) continue;
    entries.push(
      ...withLocaleAlternates(
        `/projects/${project.slug}`,
        new Date(project.updatedAt || Date.now()),
        "monthly",
        0.7,
      ),
    );
  }

  for (const album of gallery.docs as Array<{
    slug?: string;
    updatedAt?: string;
  }>) {
    if (!album.slug) continue;
    entries.push(
      ...withLocaleAlternates(
        `/gallery/${album.slug}`,
        new Date(album.updatedAt || Date.now()),
        "monthly",
        0.7,
      ),
    );
  }

  for (const survey of surveys as Array<{
    title: string;
    updatedAt?: string;
  }>) {
    if (!survey.title) continue;
    entries.push(
      ...withLocaleAlternates(
        `/surveys/${slugify(survey.title)}`,
        new Date(survey.updatedAt || Date.now()),
        "monthly",
        0.5,
      ),
    );
  }

  return entries;
}
