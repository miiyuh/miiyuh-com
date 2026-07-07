import { renderOgTitleCard, ogImageSize } from "@/components/seo/og-title-card";

export const alt = "miiyuh's blog";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgTitleCard({
    title: "miiyuh's blog",
    description: "little thoughts, big ideas, lofty dreams, all sorts, written by miiyuh.",
  });
}
