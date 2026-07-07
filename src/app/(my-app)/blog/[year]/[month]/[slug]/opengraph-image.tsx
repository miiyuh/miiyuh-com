import { ImageResponse } from "next/og";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import config from "@payload-config";
import { getServerLocale } from "@/lib/locale-server";
import { getOgAssets } from "@/utils/og-fonts";
import { getOgBackgroundStyle } from "@/components/seo/og-background";
import { resolveMediaSrc } from "@/utils/media";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const getCachedPostSummary = unstable_cache(
  async (slug: string, locale: Awaited<ReturnType<typeof getServerLocale>>) => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "blog-posts",
      locale,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
      depth: 1,
      limit: 1,
      select: { title: true, coverImage: true },
    });
    const post = docs[0];
    const coverImage = post?.coverImage;
    const rawSrc = resolveMediaSrc({
      url: typeof coverImage === "object" ? coverImage?.url : undefined,
      filename: typeof coverImage === "object" ? coverImage?.filename : undefined,
    });

    return {
      title: (post?.title as string) ?? "miiyuh.com",
      rawCoverImageSrc: rawSrc,
    };
  },
  ["blog-post-og-summary-v2"],
  { revalidate: 60, tags: ["blog-posts"] },
);

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const { title } = await getCachedPostSummary(slug, locale);

  return [
    {
      id: "og",
      alt: title,
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const [{ title, rawCoverImageSrc }, { notchFont, textFont, logoDataUrl, noiseDataUrl }] =
    await Promise.all([getCachedPostSummary(slug, locale), getOgAssets()]);

  let coverImageUrl: string | undefined;
  if (rawCoverImageSrc) {
    if (rawCoverImageSrc.startsWith("http")) {
      coverImageUrl = rawCoverImageSrc;
    } else {
      const headersList = await headers();
      const host = headersList.get("host") ?? "miiyuh.com";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      coverImageUrl = `${protocol}://${host}${rawCoverImageSrc}`;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          color: "#FAF3E0",
          padding: 80,
        }}
      >
        {coverImageUrl ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1200px",
              height: "630px",
              display: "flex",
            }}
          >
            <img
              src={coverImageUrl}
              width={1200}
              height={630}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "1200px",
                height: "630px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "1200px",
                height: "630px",
                display: "flex",
                backgroundImage:
                  "linear-gradient(to top, rgba(7, 7, 7, 0.92) 0%, rgba(7, 7, 7, 0.55) 45%, rgba(7, 7, 7, 0.15) 100%)",
              }}
            />
          </div>
        ) : (
          <div style={getOgBackgroundStyle(noiseDataUrl)} />
        )}
        <img
          src={logoDataUrl}
          width={96}
          height={96}
          style={{ position: "absolute", top: 64, right: 64 }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Stack Sans Notch",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "left",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Stack Sans Notch", data: notchFont, weight: 700, style: "normal" },
        { name: "Stack Sans Text", data: textFont, weight: 200, style: "normal" },
      ],
    },
  );
}
