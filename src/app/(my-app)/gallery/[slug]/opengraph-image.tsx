import { ImageResponse } from "next/og";
import { getPayload } from "payload";
import config from "@payload-config";
import { getOgAssets } from "@/utils/og-fonts";
import { getOgBackgroundStyle } from "@/components/seo/og-background";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "gallery-collections",
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
    select: { title: true },
  });

  return [
    {
      id: "og",
      alt: (docs[0]?.title as string) ?? "miiyuh.com",
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [{ docs }, { notchFont, textFont, logoDataUrl, noiseDataUrl }] = await Promise.all([
    getPayload({ config }).then((payload) =>
      payload.find({
        collection: "gallery-collections",
        where: { slug: { equals: slug } },
        depth: 0,
        limit: 1,
        select: { title: true, description: true },
      }),
    ),
    getOgAssets(),
  ]);

  const title = (docs[0]?.title as string) ?? "miiyuh.com";
  const description =
    typeof docs[0]?.description === "string" ? (docs[0].description as string) : "";

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
        <div style={getOgBackgroundStyle(noiseDataUrl)} />
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
        {description && (
          <div
            style={{
              display: "flex",
              fontFamily: "Stack Sans Text",
              fontWeight: 200,
              fontSize: 28,
              marginTop: 24,
              color: "#B8AE9C",
              textAlign: "left",
            }}
          >
            {description.length > 120 ? `${description.slice(0, 120)}…` : description}
          </div>
        )}
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
