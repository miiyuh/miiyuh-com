'use client';

import { useEffect, useState } from 'react';
import { initializeGallery, loadGalleryData } from '@/utils/gallery-loader';
import LoadingSpinner from '@/components/loading-spinner';
import ErrorBoundary from '@/components/error-boundary';

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);return (
    <ErrorBoundary>
      <div className="bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen flex flex-col">
        <main className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
          {isLoading && <LoadingSpinner size="lg" className="py-12" />}
          
          <section>            <div className="mb-6">
              <h1 className="text-5xl font-bold tracking-[-0.03em] mb-2">photography 📸</h1>
              <p className="font-serif text-lg text-[#FAF3E0]/90">i dedicate this section to the photographs that i took, from both my phone and my camera.</p>
            </div>
            <h2 className="text-right font-bold text-3xl mb-4">2025 japan trip 🇯🇵</h2>
            <div id="lightgallery-photos-2025jp" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
          </section>

        <section className="mt-16">          <div className="mb-6">
            <h1 className="text-5xl font-bold tracking-[-0.03em] mb-2">artwork 🎨</h1>
            <p className="font-serif text-lg text-[#FAF3E0]/90">i am still learning on how to draw, so most of these are referenced on other peoples artworks.</p>
          </div>
          <h2 className="text-right font-bold text-3xl mb-4">2 0 2 2</h2>
          <div id="lightgallery-artworks-2022" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"></div>

          <h2 className="text-right font-bold text-3xl mt-8 mb-4">2 0 2 3</h2>
          <div id="lightgallery-artworks-2023" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>        </section>
      </main>
    </div>
    </ErrorBoundary>
  );
}