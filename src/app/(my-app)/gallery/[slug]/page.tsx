import type { Metadata } from "next";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { Fragment, Suspense } from "react";
import { RefreshRouteOnSave } from "@/components/live-preview";
import AlbumClient from "./album-client";
import { GalleryAlbumSkeleton } from "./gallery-album-skeleton";
import type {
  GalleryCollectionDocument,
  GalleryCollectionSummary,
  GalleryItem,
} from "@/types/gallery";
import { resolveMediaSrc } from "@/utils/media";

// ISR: Revalidate every 60 seconds for faster repeat visits
export const revalidate = 60;

type PageParams = {
  slug: string;
};

interface PageProps {
  params: Promise<PageParams>;
}

/**
 * Fetch and cache a single published gallery collection by slug.
 * Shared by generateMetadata and AlbumPageContent to avoid duplicate Payload queries.
 */
const getCachedGalleryCollection = unstable_cache(
  async (slug: string): Promise<GalleryCollectionDocument | undefined> => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "gallery-collections",
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      },
      depth: 1,
      limit: 1,
    });
    return (docs[0] as GalleryCollectionDocument) ?? undefined;
  },
  ["gallery-collection-by-slug"],
  { revalidate: 60, tags: ["gallery-collections"] },
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = await getCachedGalleryCollection(slug);

  if (!collection) {
    return {
      title: "Album Not Found - miiyuh",
    };
  }

  return {
    title: `${collection.title} - gallery - miiyuh`,
    description: collection.description || `View ${collection.title} album`,
  };
}

async function AlbumPageContent({ params }: PageProps) {
  const { slug } = await params;

  const collection = await getCachedGalleryCollection(slug);

  if (!collection) {
    notFound();
  }

  // Transform embedded images array to GalleryItem format
  const galleryImages: GalleryItem[] = (collection.images ?? [])
    .filter((img) => img.published !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((img) => {
      const imageMedia = typeof img.image === "object" ? img.image : null;

      const src = resolveMediaSrc({
        url: imageMedia?.url,
        filename: imageMedia?.filename,
      });

      if (!src) {
        return null;
      }

      const thumbSize = imageMedia?.sizes?.thumbnail
      const thumbnailSrc =
        thumbSize && (thumbSize.url || thumbSize.filename)
          ? resolveMediaSrc({ url: thumbSize.url, filename: thumbSize.filename })
          : undefined;

      return {
        src,
        title: img.title ?? imageMedia?.alt ?? "",
        description: img.description ?? imageMedia?.caption ?? "",
        ...(thumbnailSrc ? { thumbnailSrc } : {}),
      } satisfies GalleryItem;
    })
    .filter((item): item is GalleryItem => Boolean(item));

  const collectionData: GalleryCollectionSummary = {
    id: String(collection.id),
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    status: collection.status,
    totalImages: collection.images?.length ?? 0,
  };

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <AlbumClient collection={collectionData} images={galleryImages} />
    </Fragment>
  );
}

export default function AlbumPage({ params }: PageProps) {
  return (
    <Suspense fallback={<GalleryAlbumSkeleton />}>
      <AlbumPageContent params={params} />
    </Suspense>
  );
}
