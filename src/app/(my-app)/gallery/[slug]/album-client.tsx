"use client";

import { useEffect, useRef } from "react";
import ErrorBoundary from "@/components/ui/error-boundary";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { isJapanCollection } from "@/utils";
import { OptimizedGalleryImage } from "@/components/gallery/optimized-gallery-image";
import type { GalleryCollectionSummary, GalleryItem } from "@/types/gallery";

// LightGallery imports
import lightGallery from "lightgallery";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-share.css";

interface AlbumClientProps {
  collection: GalleryCollectionSummary;
  images: GalleryItem[];
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default function AlbumClient({ collection, images }: AlbumClientProps) {
  const galleryRef = useRef<ReturnType<typeof lightGallery> | null>(null);

  useEffect(() => {
    const containerId = `lightgallery-${collection.slug}`;
    const element = document.getElementById(containerId);

    if (element && !galleryRef.current) {
      galleryRef.current = lightGallery(element, {
        plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgShare],
        speed: 500,
        selector: "a",
        download: false,
        hideControlOnEnd: true,
        closable: true,
        mousewheel: true,
        exThumbImage: "data-thumb",
      });
    }

    return () => {
      if (galleryRef.current) {
        galleryRef.current.destroy();
        galleryRef.current = null;
      }
    };
  }, [collection.slug]);

  return (
    <ErrorBoundary>
      <div className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative overflow-x-hidden">
        <main className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-24">
          <div>
            {/* Breadcrumb Navigation */}
            <div className="mb-8">
              <SimpleBreadcrumb
                items={[
                  { label: "home", href: "/" },
                  { label: "gallery", href: "/gallery" },
                  { label: collection.title },
                ]}
                className="mb-0"
              />
            </div>

            {/* Collection Header */}
            <div className="mb-16 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary leading-[0.9] text-balance">
                {collection.title}
                {isJapanCollection(collection.slug) && (
                  <span className="ml-3 inline-block">🇯🇵</span>
                )}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed select-none cursor-default text-pretty">
                {collection.description}
              </p>
            </div>

            {/* Images Grid */}
            <div className="relative">
              <div
                id={`lightgallery-${collection.slug}`}
                className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
              >
                {images.map((image, imgIndex) => {
                  const safeTitle = escapeHtml(image.title ?? "");
                  const safeDescription = escapeHtml(image.description ?? "");
                  const subHtml = `<div class='text-center'><h4 class='text-lg font-bold mb-1'>${safeTitle}</h4><p class='text-sm'>${safeDescription}</p></div>`;

                  return (
                    <div key={`${collection.slug}-${imgIndex}`}>
                      <a
                        href={image.src}
                        className="block group relative overflow-hidden rounded-2xl glass-panel-pro shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:border-accent-primary/50 transition-all duration-500"
                        data-sub-html={subHtml}
                        data-thumb={image.thumbnailSrc || undefined}
                      >
                        <OptimizedGalleryImage
                          image={image}
                          index={imgIndex}
                          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"
                          quality={imgIndex < 6 ? 85 : 80}
                          priority={imgIndex < 6}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none"></div>

                        {image.title && (
                          <div className="absolute bottom-0 left-0 right-0">
                            <div className="px-3 py-2 bg-linear-to-t from-black/70 to-transparent md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                              <h3 className="font-bold text-white text-xs truncate">
                                {image.title}
                              </h3>
                            </div>
                          </div>
                        )}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
