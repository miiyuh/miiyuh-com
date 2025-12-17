'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ErrorBoundary from '@/components/ui/error-boundary';
import { ScrollAnimation } from '@/components/effects/scroll-animations';
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb';
import { Camera, Palette, Grid, ArrowUpRight } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import type {
  GalleryCollectionSummary,
  GalleryDataMap,
  GalleryItem,
} from '@/types/gallery';

interface GalleryClientProps {
  galleryData: GalleryDataMap
  collections: GalleryCollectionSummary[]
}

export default function GalleryClient({ galleryData, collections }: GalleryClientProps) {
  const [mounted, setMounted] = useState(false);
  const playClick = useSound('/sounds/click.mp3', 0.7);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to determine section type
  const getSectionType = (slug: string) => {
    if (slug.includes('photo') || slug.includes('2025') || slug.includes('japan')) return 'photography';
    if (slug.includes('artwork')) return 'artwork';
    return 'gallery';
  }

  return (
    <ErrorBoundary>
      <div className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative overflow-x-hidden">

        <main className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 py-24" style={{ paddingTop: '24px' }}>

          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Breadcrumb Navigation */}
            <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
              <SimpleBreadcrumb
                items={[
                  { label: 'home', href: '/' },
                  { label: 'gallery' },
                ]}
                className="mb-0"
              />
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary">
                gallery
              </h1>
              <p className="text-lg md:text-xl text-text-secondary">
                from the pens and lenses of mine, through out the years. a curated collection of my photography and artwork.
              </p>
            </div>

            {/* Albums Grid - borders act as grid lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
              {collections.map((collection, index) => {
                const images = galleryData[collection.slug] ?? [];
                const stackImages: GalleryItem[] = images.slice(0, 3);
                const type = getSectionType(collection.slug);

                return (
                  <ScrollAnimation
                    key={collection.id}
                    animation="fadeUp"
                    delay={index * 0.1}
                  >
                    <Link
                      href={`/gallery/${collection.slug}`}
                      onClick={playClick}
                      className="group block w-full text-left h-full"
                    >
                      <article className="h-full p-6 border-r border-b border-white/10 bg-transparent hover:bg-white/5 transition-all duration-500 flex flex-col relative overflow-visible">

                        {/* Stacked Cover Images */}
                        <div className="w-full aspect-square relative mb-6 perspective-1000">
                          {stackImages.length > 0 ? (
                            stackImages.map((img, i) => (
                              <div
                                key={i}
                                className={`absolute inset-0 rounded-2xl transition-all duration-500 ease-out origin-bottom
                                  ${i === 0 ? 'z-30' : i === 1 ? 'z-20' : 'z-10'}
                                `}
                                style={{
                                  transform: `translateY(${i * 8}px) scale(${1 - i * 0.05})`,
                                }}
                              >
                                <div className={`w-full h-full relative rounded-2xl overflow-hidden border border-white/10 bg-bg-primary shadow-lg transition-all duration-500 origin-bottom
                                  ${i === 1 ? 'group-hover:-rotate-6 group-hover:-translate-x-8' : ''}
                                  ${i === 2 ? 'group-hover:rotate-6 group-hover:translate-x-8' : ''}
                                `}>
                                  <Image
                                    src={img.src}
                                    alt={collection.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    quality={i === 0 ? 60 : 45}
                                    loading="lazy"
                                    placeholder="empty"
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="w-full h-full rounded-2xl bg-white/5 flex items-center justify-center text-text-muted border border-white/10">
                              <Grid className="w-12 h-12 opacity-20" />
                            </div>
                          )}

                          {/* Type Badge */}
                          <div className="absolute top-16 left-4 z-40 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                            {type === 'photography' ? <Camera className="w-3 h-3" /> : <Palette className="w-3 h-3" />}
                            {type}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-2 pb-2 flex flex-col grow relative z-40">
                          <div className="flex items-start justify-between mb-2">
                            <h2 className="text-2xl font-serif font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                              {collection.title}
                              {(collection.slug.includes('2025') || collection.slug.includes('japan')) && <span className="ml-2 inline-block">🇯🇵</span>}
                            </h2>
                            <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                          </div>

                          <p className="text-text-secondary text-sm line-clamp-2 mb-4 grow">
                            {collection.description || 'View collection'}
                          </p>

                          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted">
                            <span>{images.length} ITEMS</span>
                            <span className="group-hover:text-text-primary transition-colors">VIEW ALBUM</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </ScrollAnimation>
                );
              })}
            </div>

          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}