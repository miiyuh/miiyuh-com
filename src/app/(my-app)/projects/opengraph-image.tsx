import { renderOgTitleCard, ogImageSize } from "@/components/seo/og-title-card";

export const alt = "miiyuh's projects";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgTitleCard({
    title: "miiyuh's projects",
    description: "side projects, university work, and research papers — the collection by miiyuh.",
  });
}
