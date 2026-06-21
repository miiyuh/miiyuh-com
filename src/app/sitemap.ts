import { getPayload } from "payload";
import config from "@payload-config";

const baseUrl = "https://miiyuh.com";

export default async function sitemap() {
  const payload = await getPayload({ config });

  const [blogPosts, projects, papers, gallery] = await Promise.all([
    payload
      .find({
        collection: "blog-posts",
        limit: 1000,
        depth: 0,
        pagination: false,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "projects",
        limit: 1000,
        depth: 0,
        pagination: false,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "papers",
        limit: 1000,
        depth: 0,
        pagination: false,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "gallery-collections",
        limit: 1000,
        depth: 0,
        pagination: false,
      })
      .catch(() => ({ docs: [] })),
  ]);

  const entries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aboutme`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/academic`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/papers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/socials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ] as Array<{
    url: string;
    lastModified: Date;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }>;

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
    entries.push({
      url: `${baseUrl}/blog/${year}/${month}/${post.slug}`,
      lastModified: new Date(post.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const project of projects.docs as Array<{
    slug?: string;
    updatedAt?: string;
  }>) {
    if (!project.slug) continue;
    entries.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const paper of papers.docs as Array<{
    slug?: string;
    updatedAt?: string;
  }>) {
    if (!paper.slug) continue;
    entries.push({
      url: `${baseUrl}/projects/papers/${paper.slug}`,
      lastModified: new Date(paper.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const album of gallery.docs as Array<{
    slug?: string;
    updatedAt?: string;
  }>) {
    if (!album.slug) continue;
    entries.push({
      url: `${baseUrl}/gallery/${album.slug}`,
      lastModified: new Date(album.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
