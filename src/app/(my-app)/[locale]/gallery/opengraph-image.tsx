import { renderOgTitleCard, ogImageSize } from "@/components/seo/og-title-card";

export const alt = "miiyuh's gallery";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgTitleCard({
    title: "miiyuh's gallery",
    description:
      "from the pens and lenses of mine, through out the years. a curated collection of my photography and artwork by miiyuh.",
  });
}
