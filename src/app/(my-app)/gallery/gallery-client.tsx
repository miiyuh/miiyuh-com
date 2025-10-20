'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { initializeGallery, type GalleryImage } from '@/utils/gallery-loader';
import { JapanFlag } from '@/utils';
import ErrorBoundary from '@/components/ui/error-boundary';
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background';

interface Collection {
  id: string
  slug: string
  title: string
  description?: string
  status: 'draft' | 'published'
}

interface GalleryClientProps {
  galleryData: Record<string, GalleryImage[]>
  collections: Collection[]
}

export default function GalleryClient({ galleryData, collections }: GalleryClientProps) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<{
    startTime: number;
    dataLoadTime?: number;
    galleryInitTime?: number;
    totalImages?: number;
    totalTime?: number;
  }>({ startTime: Date.now() });

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    const startTime = Date.now();

    const loadGallery = async () => {
      try {
        console.log('🎨 Gallery loading started with CMS data');
        
        const dataLoadStart = Date.now();
        // Data is already provided from the server
        const dataLoadTime = Date.now() - dataLoadStart;
        
        console.log(`📊 Gallery data loaded in ${dataLoadTime}ms`, galleryData);
        
        if (!isMounted) return;
        
        // Calculate total images from all collections
        const totalImages = Object.values(galleryData).reduce((sum, images) => sum + images.length, 0);
        
        setDebugInfo(prev => ({ 
          ...prev, 
          dataLoadTime, 
          totalImages 
        }));
        
        // Build galleries array from the provided data
        const galleries = collections.map(collection => ({
          id: `lightgallery-${collection.slug}`,
          data: galleryData[collection.slug] || []
        }));
        
        const galleryInitStart = Date.now();
        
        // Initialize galleries sequentially for reliability
        console.log('🔄 Starting sequential gallery initialization');
        for (let i = 0; i < galleries.length; i++) {
          const gallery = galleries[i];
          if (gallery.data && gallery.data.length > 0) {
            const initStart = Date.now();
            await initializeGallery(gallery.id, gallery.data);
            const initTime = Date.now() - initStart;
            console.log(`Gallery ${gallery.id} initialized in ${initTime}ms (${gallery.data.length} images)`);
          }
        }
        
        const galleryInitTime = Date.now() - galleryInitStart;
        const totalTime = Date.now() - startTime;
        
        console.log(`All galleries initialized in ${galleryInitTime}ms`);
        console.log(`Total gallery load time: ${totalTime}ms`);
        
        if (isMounted) {
          setDebugInfo(prev => ({ 
            ...prev, 
            galleryInitTime,
            totalTime 
          }));
        }
        
      } catch (error) {
        console.error('Failed to load gallery:', error);
        if (isMounted) {
          setError('Failed to load gallery. Please try refreshing the page.');
        }
      }
    };

    loadGallery();

    return () => {
      isMounted = false;
      // Clean up lightGallery instances on unmount
      collections.forEach(collection => {
        const containerId = `lightgallery-${collection.slug}`;
        const container = document.getElementById(containerId);
        if (container) {
          const containerWithLg = container as HTMLElement & { lgGallery?: { destroy: () => void } };
          if (containerWithLg.lgGallery) {
            containerWithLg.lgGallery.destroy();
            containerWithLg.lgGallery = undefined;
          }
        }
      });
    };
  }, [galleryData, collections]);  return (
    <ErrorBoundary>
      <div className="bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen flex flex-col relative">
        
        {/* Interactive dots background */}
        <InteractiveDotsBackground />

        <main className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
          {error && (
            <div className="py-12 text-center">
              <div className="text-red-400 mb-4">⚠️</div>
              <p className="text-[#FAF3E0]/70 font-serif">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 rounded-lg transition-colors duration-300 text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Debug Panel (only shown in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-4 right-4 bg-[#1A1A1A]/90 border border-[#FAF3E0]/20 rounded-lg p-4 text-xs z-50 backdrop-blur-sm">
              <div className="text-[#FAF3E0]/60 mb-2">Gallery Debug Info</div>
              <div className="text-[#FAF3E0]/80 space-y-1">
                <div>Data Load: {debugInfo.dataLoadTime || 0}ms</div>
                <div>Gallery Init: {debugInfo.galleryInitTime || 0}ms</div>
                <div>Total Time: {debugInfo.totalTime || 0}ms</div>
                <div>Images: {debugInfo.totalImages || 0}</div>
              </div>
            </div>
          )}
          
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Breadcrumb Navigation */}
            <nav className="w-full mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
                <li>
                  <Link 
                    href="/" 
                    className="hover:text-[#FAF3E0] transition-colors duration-300"
                  >
                    miiyuh
                  </Link>
                </li>
                <li>
                  <span className="text-[#FAF3E0]/40">/</span>
                </li>
                <li>
                  <span className="text-[#FAF3E0]/90">gallery</span>
                </li>
              </ol>
            </nav>

            {/* Dynamic Gallery Sections */}
            {collections.map((collection, index) => {
              const isPhotoSection = collection.slug.includes('photo') || collection.slug.includes('2025') || collection.slug.includes('japan');
              const isArtworkSection = collection.slug.includes('artwork');
              
              // Show header when it's the first item, or when switching section types
              const showHeader = index === 0 || 
                (isPhotoSection && collections[index - 1]?.slug.includes('artwork')) ||
                (isArtworkSection && !collections[index - 1]?.slug.includes('artwork'));
              
              return (
                <section key={collection.id} className={index > 0 ? 'mt-20' : ''}>
                  {/* Section header - only show once per type */}
                  {showHeader && (
                    <div className="mb-12">
                      <div className="mb-6">
                        <h1 className="text-5xl font-bold tracking-[-0.03em] mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                          {isPhotoSection ? 'photography 📸' : 'artwork 🎨'}
                        </h1>
                        
                        {/* Decorative line */}
                        <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
                      </div>
                      
                      <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
                        {collection.description || (isPhotoSection 
                          ? 'i dedicate this section to the photographs that i took, from both my phone and my camera.'
                          : 'i am still learning on how to draw, so most of these are referenced on other peoples artworks.'
                        )}
                      </p>
                    </div>
                  )}
                  
                  {/* Collection display */}
                  <div className="mb-8">
                    <h2 className="text-right font-bold text-3xl mb-6 hover:text-[#FAF3E0] transition-colors duration-300">
                      {collection.title} {(collection.slug.includes('2025') || collection.slug.includes('japan')) && <JapanFlag />}
                    </h2>
                    <div 
                      id={`lightgallery-${collection.slug}`} 
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"
                    ></div>
                  </div>
                </section>
              );
            })}
          </div>


        </main>
      </div>
    </ErrorBoundary>
  );
}