'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { initializeGallery, loadGalleryData } from '@/utils/gallery-loader';
import { JapanFlag } from '@/utils';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorBoundary from '@/components/ui/error-boundary';
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background';

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
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
        console.log('🎨 Gallery loading started');
        setLoadingProgress(10);
        
        const dataLoadStart = Date.now();
        const data = await loadGalleryData();
        const dataLoadTime = Date.now() - dataLoadStart;
        
        console.log(`📊 Gallery data loaded in ${dataLoadTime}ms`, data);
        
        if (!isMounted) return;
        
        const totalImages = (data.photos_2025jp?.length || 0) + 
                           (data.artworks_2022?.length || 0) + 
                           (data.artworks_2023?.length || 0);
        
        setDebugInfo(prev => ({ 
          ...prev, 
          dataLoadTime, 
          totalImages 
        }));
        
        setLoadingProgress(30);
        
        const galleries = [
          { id: 'lightgallery-photos-2025jp', data: data.photos_2025jp },
          { id: 'lightgallery-artworks-2022', data: data.artworks_2022 },
          { id: 'lightgallery-artworks-2023', data: data.artworks_2023 }
        ];
        
        let completedGalleries = 0;
        const galleryInitStart = Date.now();
        
        // Initialize galleries sequentially for better perceived performance
        console.log('🔄 Starting sequential gallery initialization');
        for (let i = 0; i < galleries.length; i++) {
          const gallery = galleries[i];
          if (gallery.data && gallery.data.length > 0) {
            const initStart = Date.now();
            await initializeGallery(gallery.id, gallery.data);
            const initTime = Date.now() - initStart;
            console.log(`🖼️ Gallery ${gallery.id} initialized in ${initTime}ms (${gallery.data.length} images)`);
          }
          completedGalleries++;
          if (isMounted) {
            setLoadingProgress(30 + (completedGalleries / galleries.length) * 60);
          }
        }
        
        const galleryInitTime = Date.now() - galleryInitStart;
        const totalTime = Date.now() - startTime;
        
        console.log(`✅ All galleries initialized in ${galleryInitTime}ms`);
        console.log(`🎯 Total gallery load time: ${totalTime}ms`);
        
        if (isMounted) {
          setDebugInfo(prev => ({ 
            ...prev, 
            galleryInitTime,
            totalTime 
          }));
          setLoadingProgress(100);
          // Small delay to show 100% before hiding loading
          setTimeout(() => {
            if (isMounted) {
              setIsLoading(false);
            }
          }, 300);
        }
        
      } catch (error) {
        console.error('❌ Failed to load gallery:', error);
        if (isMounted) {
          setError('Failed to load gallery. Please try refreshing the page.');
          setIsLoading(false);
        }
      }
    };

    loadGallery();

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
        
        {/* Interactive dots background */}
        <InteractiveDotsBackground />

        <main className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
          {isLoading && (
            <div className="py-12">
              <LoadingSpinner size="lg" />
              <div className="text-center mt-4">
                <div className="w-48 h-2 bg-[#FAF3E0]/20 rounded-full mx-auto mb-2">
                  <div 
                    className="h-full bg-[#FAF3E0]/60 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#FAF3E0]/60 font-serif">loading gallery... {Math.round(loadingProgress)}%</p>
              </div>
            </div>
          )}
          
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
          {process.env.NODE_ENV === 'development' && !isLoading && (
            <div className="fixed top-4 right-4 bg-[#1A1A1A]/90 border border-[#FAF3E0]/20 rounded-lg p-4 text-xs z-50 backdrop-blur-sm">
              <div className="text-[#FAF3E0]/60 mb-2">🔧 Gallery Debug Info</div>
              <div className="text-[#FAF3E0]/80 space-y-1">
                <div>Data Load: {debugInfo.dataLoadTime || 0}ms</div>
                <div>Gallery Init: {debugInfo.galleryInitTime || 0}ms</div>
                <div>Total Time: {debugInfo.totalTime || 0}ms</div>
                <div>Images: {debugInfo.totalImages || 0}</div>
              </div>
            </div>
          )}
          
          <div className={`transition-all duration-1000 ${mounted && !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                <div id="lightgallery-photos-2025jp" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"></div>
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
                  <div id="lightgallery-artworks-2022" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"></div>
                </div>

                <div>
                  <h2 className="text-right font-bold text-3xl mb-6 hover:text-[#FAF3E0] transition-colors duration-300">
                    2 0 2 3
                  </h2>
                  <div id="lightgallery-artworks-2023" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"></div>
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