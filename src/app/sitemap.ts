import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { getAllForms } from "@/utils/forms";
import { slugify } from "@/utils/slugify";

const baseUrl = "https://miiyuh.com";

type SitemapEntry = MetadataRoute.Sitemap[number];

function withLocaleAlternates(url: string, lastModified: Date, changeFrequency: SitemapEntry["changeFrequency"], priority: number): SitemapEntry {
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: url,
        ms: `${url}${url.includes("?") ? "&" : "?"}locale=ms`,
      },
    },
  };
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
    withLocaleAlternates(baseUrl, buildTime, "weekly", 1.0),
    withLocaleAlternates(`${baseUrl}/gallery`, buildTime, "weekly", 0.8),
    withLocaleAlternates(`${baseUrl}/projects`, buildTime, "weekly", 0.8),
    withLocaleAlternates(`${baseUrl}/blog`, buildTime, "weekly", 0.8),
    withLocaleAlternates(`${baseUrl}/surveys`, buildTime, "monthly", 0.5),
    withLocaleAlternates(
      `${baseUrl}/privacy-policy`,
      new Date((privacyPolicy as { updatedAt?: string } | null)?.updatedAt || buildTime),
      "yearly",
      0.3,
    ),
    withLocaleAlternates(
      `${baseUrl}/terms-of-service`,
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
    const date = new Date(post.publishedAt || post.createdAt || Date.now());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    entries.push(
      withLocaleAlternates(
        `${baseUrl}/blog/${year}/${month}/${post.slug}`,
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
      withLocaleAlternates(
        `${baseUrl}/projects/${project.slug}`,
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
      withLocaleAlternates(
        `${baseUrl}/gallery/${album.slug}`,
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
      withLocaleAlternates(
        `${baseUrl}/surveys/${slugify(survey.title)}`,
        new Date(survey.updatedAt || Date.now()),
        "monthly",
        0.5,
      ),
    );
  }

  return entries;
}
