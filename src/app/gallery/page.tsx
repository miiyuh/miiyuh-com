'use client';

import { useEffect, useState } from 'react';
import { initializeGallery, loadGalleryData } from '@/utils/gallery-loader';
import { JapanFlag } from '@/utils';
import LoadingSpinner from '@/components/loading-spinner';
import ErrorBoundary from '@/components/error-boundary';

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isMounted = true; // Prevent state updates if component unmounts

    const loadGallery = async () => {
      try {
        const data = await loadGalleryData();
        
        if (isMounted) {
          if (data.photos_2025jp) {
            initializeGallery('lightgallery-photos-2025jp', data.photos_2025jp);
          }
          if (data.artworks_2022) {
            initializeGallery('lightgallery-artworks-2022', data.artworks_2022);
          }
          if (data.artworks_2023) {
            initializeGallery('lightgallery-artworks-2023', data.artworks_2023);
          }
        }
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadGallery();

    // Cleanup function
    return () => {
      isMounted = false;
      // Clean up lightGallery instances on unmount
      const containers = [
        'lightgallery-photos-2025jp',
        'lightgallery-artworks-2022', 
        'lightgallery-artworks-2023'
      ];
        containers.forEach(containerId => {
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
  }, []);  return (
    <ErrorBoundary>
      <div className="bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen flex flex-col relative">
        
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/6 right-1/6 w-80 h-80 bg-[#FAF3E0]/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/5 left-1/6 w-64 h-64 bg-[#FAF3E0]/2 rounded-full blur-2xl animate-bounce" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-3/5 right-1/2 w-48 h-48 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <main className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
          {isLoading && <LoadingSpinner size="lg" className="py-12" />}
          
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Photography Section */}
            <section>
              <div className="mb-12">
                <div className="mb-6">
                  <h1 className="text-5xl font-bold tracking-[-0.03em] mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                    photography 📸
                  </h1>
                  
                  {/* Decorative line */}
                  <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
                </div>
                
                <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
                  i dedicate this section to the photographs that i took, from both my phone and my camera.
                </p>
              </div>
                <div className="mb-8">
                <h2 className="text-right font-bold text-3xl mb-6 hover:text-[#FAF3E0] transition-colors duration-300">
                  2025 japan trip <JapanFlag />
                </h2>
                <div id="lightgallery-photos-2025jp" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
              </div>
            </section>

            {/* Artwork Section */}
            <section className="mt-20">
              <div className="mb-12">
                <div className="mb-6">
                  <h1 className="text-5xl font-bold tracking-[-0.03em] mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                    artwork 🎨
                  </h1>
                  
                  {/* Decorative line */}
                  <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
                </div>
                
                <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
                  i am still learning on how to draw, so most of these are referenced on other peoples artworks.
                </p>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h2 className="text-right font-bold text-3xl mb-6 hover:text-[#FAF3E0] transition-colors duration-300">
                    2 0 2 2
                  </h2>
                  <div id="lightgallery-artworks-2022" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
                </div>

                <div>
                  <h2 className="text-right font-bold text-3xl mb-6 hover:text-[#FAF3E0] transition-colors duration-300">
                    2 0 2 3
                  </h2>
                  <div id="lightgallery-artworks-2023" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
                </div>
              </div>
            </section>
          </div>

          {/* Fun interactive element */}
          <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
            <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
              capturing moments ✨
            </p>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}