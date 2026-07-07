import { renderOgTitleCard, ogImageSize } from "@/components/seo/og-title-card";

export const alt = "miiyuh's webpage";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgTitleCard({
    title: "miiyuh",
    description: "creative developer & photographer",
  });
}
