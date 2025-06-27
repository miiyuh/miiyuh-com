import React from 'react'
import { GalleryImage } from '@/utils/gallery-loader'
import GalleryGrid from './gallery-grid'

interface GallerySectionProps {
  title: string
  description: string
  emoji: string
  galleries: Array<{
    title: string
    containerId: string
    images: GalleryImage[]
  }>
  className?: string
}

const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  description,
  emoji,
  galleries,
  className = ""
}) => {
  return (
    <section className={className}>
      <div className="mb-12">
        <div className="mb-6">
          <h1 className="text-5xl font-bold tracking-[-0.03em] mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
            {title} {emoji}
          </h1>
          
          {/* Decorative line */}
          <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
        </div>
        
        <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
          {description}
        </p>
      </div>
      
      <div className="space-y-12">
        {galleries.map((gallery, index) => (
          <GalleryGrid
            key={gallery.containerId}
            images={gallery.images}
            containerId={gallery.containerId}
            title={gallery.title}
            className={index === 0 ? "" : ""} // Add any specific styling for different galleries
          />
        ))}
      </div>
    </section>
  )
}

export default GallerySection
