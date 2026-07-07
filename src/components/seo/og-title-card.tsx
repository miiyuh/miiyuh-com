import { ImageResponse } from "next/og";
import { getOgAssets } from "@/utils/og-fonts";
import { getOgBackgroundStyle } from "@/components/seo/og-background";

export const ogImageSize = { width: 1200, height: 630 };

/**
 * Shared card layout for OG images that just show a title + description
 * over the brand grid/noise background (site-wide default + list pages).
 * Per-entity images (blog post, project, gallery collection) have their
 * own layout since they fetch different data per route.
 */
export async function renderOgTitleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { notchFont, textFont, logoDataUrl, noiseDataUrl } = await getOgAssets();

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
            fontSize: 72,
            fontWeight: 700,
            textAlign: "left",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Stack Sans Text",
            fontWeight: 200,
            fontSize: 32,
            marginTop: 16,
            color: "#B8AE9C",
            textAlign: "left",
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Stack Sans Notch", data: notchFont, weight: 700, style: "normal" },
        { name: "Stack Sans Text", data: textFont, weight: 200, style: "normal" },
      ],
    },
  );
}
