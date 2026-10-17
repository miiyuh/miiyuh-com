"use client";

import Image, { getImageProps, type ImageProps } from "next/image";
import type { JxlSource } from "@/utils/media";

// Elements whose pre-hydration load has already been replayed.
const replayed = new WeakSet<HTMLImageElement>();

export type JxlImageProps = ImageProps & {
  /** Pre-encoded JPEG XL renditions; without them this is a plain next/image. */
  jxl?: JxlSource[];
};

/**
 * next/image with a JPEG XL source in front of it.
 *
 * Next's optimizer cannot output JXL, so the JXL files are generated ahead of
 * time (see src/lib/jxl) and offered through `<picture>`. Browsers without JXL
 * support skip the `<source>` and get the usual optimized AVIF/WebP `<img>`.
 */
export function JxlImage({ jxl, ...props }: JxlImageProps) {
  if (!jxl?.length) return <Image {...props} />;

  const { onLoad, onError, ...rest } = props;
  const { props: img } = getImageProps(rest);
  const srcSet = jxl.map((s) => `${s.src} ${s.width}w`).join(", ");
  // Width descriptors need `sizes`; fixed-size images only set width/height.
  const sizes = img.sizes ?? (img.width ? `${img.width}px` : undefined);

  return (
    <picture>
      <source type="image/jxl" srcSet={srcSet} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img
        {...img}
        onLoad={onLoad}
        onError={onError}
        // A server-rendered image can finish loading before hydration attaches
        // onLoad (next/image handles this too); replay it so fade-ins resolve.
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0 && onLoad && !replayed.has(el)) {
            replayed.add(el);
            el.dispatchEvent(new Event("load"));
          }
        }}
      />
    </picture>
  );
}
