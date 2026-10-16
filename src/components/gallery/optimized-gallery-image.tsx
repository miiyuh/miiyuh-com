"use client";

import { useState, memo } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types/gallery";

interface OptimizedGalleryImageProps {
  image: GalleryItem;
  index: number;
  onLoad?: (index: number) => void;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
}

function OptimizedGalleryImageComponent({
  image,
  index,
  onLoad,
  className = "",
  sizes = "(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw",
  quality = 80,
  priority = false,
}: OptimizedGalleryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.(index);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`w-full aspect-square ${className}`}>
        <div className="w-full h-full bg-white/10 rounded-2xl flex items-center justify-center text-text-muted">
          <span className="text-sm">Failed to load</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full aspect-square relative ${className}`}>
        {!isLoaded && (
          <div className="absolute inset-0 bg-linear-to-r from-white/2 via-white/[0.07] to-white/2 bg-size-[200%_100%] animate-skeleton rounded-2xl" />
        )}
        <Image
        src={image.src}
        alt={image.title || "Gallery image"}
        fill
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes={sizes}
        quality={quality}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

export const OptimizedGalleryImage = memo(
  OptimizedGalleryImageComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.image.src === nextProps.image.src &&
      prevProps.index === nextProps.index &&
      prevProps.priority === nextProps.priority &&
      prevProps.quality === nextProps.quality
    );
  },
);
