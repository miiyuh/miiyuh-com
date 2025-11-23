'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { JapanFlag } from '@/utils'
import ErrorBoundary from '@/components/ui/error-boundary'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Camera, Palette } from 'lucide-react'
import type { GalleryCollectionSummary, GalleryItem } from '@/types/gallery'

// LightGallery imports
import lightGallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import lgRotate from 'lightgallery/plugins/rotate'
import lgShare from 'lightgallery/plugins/share'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-rotate.css'
import 'lightgallery/css/lg-share.css'

interface AlbumClientProps {
    collection: GalleryCollectionSummary
    images: GalleryItem[]
}

export default function AlbumClient({ collection, images }: AlbumClientProps) {
    const [mounted, setMounted] = useState(false)
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
    const galleryRef = useRef<ReturnType<typeof lightGallery> | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const containerId = `lightgallery-${collection.slug}`
        const element = document.getElementById(containerId)

        if (element && !galleryRef.current) {
            galleryRef.current = lightGallery(element, {
                plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgShare],
                speed: 500,
                selector: 'a',
                download: false,
                hideControlOnEnd: true,
                closable: true,
                mousewheel: true,
            })
        }

        return () => {
            if (galleryRef.current) {
                galleryRef.current.destroy()
                galleryRef.current = null
            }
        }
    }, [collection.slug])

    const getSectionType = (slug: string) => {
        if (slug.includes('photo') || slug.includes('2025') || slug.includes('japan')) return 'photography'
        if (slug.includes('artwork')) return 'artwork'
        return 'gallery'
    }

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index))
    }

    return (
        <ErrorBoundary>
            <div className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative overflow-x-hidden">
                <main className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 py-24">
                    <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                        {/* Breadcrumb Navigation */}
                        <SimpleBreadcrumb
                            items={[
                                { label: 'home', href: '/' },
                                { label: 'gallery', href: '/gallery' },
                                { label: collection.title },
                            ]}
                            className="mb-16"
                        />

                        {/* Collection Header */}
                        <div className="mb-16 max-w-4xl">
                            <div className="flex items-center gap-3 mb-4 text-accent-primary font-mono text-sm uppercase tracking-widest">
                                {getSectionType(collection.slug) === 'photography' ? <Camera className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
                                {getSectionType(collection.slug)}
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary leading-[0.9]">
                                {collection.title}
                                {(collection.slug.includes('2025') || collection.slug.includes('japan')) && <JapanFlag className="ml-3 inline-block" />}
                            </h1>
                            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                                {collection.description}
                            </p>
                        </div>

                        {/* Images Grid */}
                        <div
                            id={`lightgallery-${collection.slug}`}
                            className="columns-3 md:columns-2 lg:columns-3 gap-2 md:gap-6 space-y-2 md:space-y-6"
                        >
                            {images.map((image, imgIndex) => (
                                <ScrollAnimation
                                    key={`${collection.slug}-${imgIndex}`}
                                    animation="fadeUp"
                                    delay={0.1 + (imgIndex % 5) * 0.05}
                                    className="break-inside-avoid"
                                >
                                    <a
                                        href={image.src}
                                        className="block group relative overflow-hidden rounded-2xl glass-panel-pro hover:border-accent-primary/50 transition-all duration-500"
                                        data-sub-html={`<div class='text-center'><h4 class='text-lg font-bold mb-1'>${image.title || ''}</h4><p class='text-sm'>${image.description || ''}</p></div>`}
                                    >
                                        <div className="relative w-full aspect-square">
                                            {/* Skeleton Loader */}
                                            {!loadedImages.has(imgIndex) && (
                                                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl" />
                                            )}

                                            <Image
                                                src={image.src}
                                                alt={image.title || 'Gallery image'}
                                                fill
                                                className={`w-full h-full object-cover transition-all duration-700 ${loadedImages.has(imgIndex) ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                quality={85}
                                                onLoad={() => handleImageLoad(imgIndex)}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                        </div>

                                        {(image.title || image.description) && (
                                            <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-sm absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                {image.title && <h3 className="font-bold text-white text-sm truncate">{image.title}</h3>}
                                                {image.description && <p className="text-white/70 text-xs truncate">{image.description}</p>}
                                            </div>
                                        )}
                                    </a>
                                </ScrollAnimation>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    )
}
