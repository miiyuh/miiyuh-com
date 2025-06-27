import React from 'react'
import { GalleryImage } from '@/utils/gallery-loader'

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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"
      >
        {/* The lightGallery will populate this container dynamically */}
      </div>
    </div>
  )
}

export default GalleryGrid
