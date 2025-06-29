'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { GalleryImage, initializeGallery } from '@/utils/gallery-loader'

interface GalleryGridProps {
  images: GalleryImage[]
  containerId: string
  title: string
  className?: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  containerId, 
  title, 
  className = "" 
}) => {
  useEffect(() => {
    if (images && images.length > 0) {
      // Initialize lightGallery
      initializeGallery(containerId, images).catch(console.error);
    }
  }, [images, containerId]);

  if (!images || images.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-[#FAF3E0]/60 font-serif">No images available for {title}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <h2 className="text-right font-bold text-3xl mb-6 hover:text-[#FAF3E0] transition-colors duration-300">
        {title}
      </h2>
      <div 
        id={containerId} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {images.map((image, index) => (
          <a
            key={index}
            href={image.fullSrc || image.src}
            className="block w-full aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#1A1A1A]/50"
            data-sub-html={`
              <div class='text-center'>
                <h4 class='text-lg font-bold mb-1'>${image.title || ''}</h4>
                <p class='text-sm'>${image.description || ''}</p>
              </div>
            `}
          >
            <Image
              src={image.src || '/placeholder.jpg'}
              alt={image.alt || image.title || 'Gallery image'}
              width={400}
              height={400}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 4} // Prioritize first 4 images
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default GalleryGrid
