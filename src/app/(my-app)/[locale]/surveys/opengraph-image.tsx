import { renderOgTitleCard, ogImageSize } from "@/components/seo/og-title-card";

export const alt = "miiyuh's surveys";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgTitleCard({
    title: "miiyuh's surveys",
    description:
      "quick polls and feedback forms. share your thoughts on various topics and help shape future content.",
  });
}
