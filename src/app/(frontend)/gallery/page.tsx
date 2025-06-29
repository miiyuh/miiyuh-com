import Link from 'next/link';
import { loadGalleryData, GalleryData } from '@/utils/gallery-loader';
import ErrorBoundary from '@/components/ui/error-boundary';
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background';
import GallerySection from '@/components/gallery/gallery-section';
import '../../gallery-lightbox.css';

export default async function GalleryPage() {
  let galleryData: GalleryData = { albums: [] };
  let error: string | null = null;

  try {
    galleryData = await loadGalleryData();
  } catch (err) {
    console.error('Error loading gallery data:', err);
    error = 'Failed to load gallery';
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="bg-[#1A1A1A] text-[#FAF3E0] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Gallery</h1>
            <p className="text-red-400">{error}</p>
            <Link 
              href="/" 
              className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Group albums by category
  const photographyAlbums = galleryData.albums.filter(album => album.category === 'photography');
  const artworkAlbums = galleryData.albums.filter(album => 
    album.category === 'artwork' || album.category === 'digital-art'
  );

  return (
    <ErrorBoundary>
      <div className="bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen flex flex-col relative">
        
        {/* Interactive dots background */}
        <InteractiveDotsBackground />

        <main className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
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
          {photographyAlbums.length > 0 && (
            <GallerySection
              title="photography"
              description="i dedicate this section to the photographs that i took, from both my phone and my camera."
              emoji="📸"
              galleries={photographyAlbums.map(album => ({
                title: album.title,
                containerId: `lightgallery-${album.slug || album.id}`,
                images: album.images
              }))}
            />
          )}

          {/* Artwork Section */}
          {artworkAlbums.length > 0 && (
            <GallerySection
              title="artwork"
              description="i am still learning on how to draw, so most of these are referenced on other peoples artworks."
              emoji="🎨"
              galleries={artworkAlbums.map(album => ({
                title: album.title,
                containerId: `lightgallery-${album.slug || album.id}`,
                images: album.images
              }))}
              className="mt-20"
            />
          )}

          {/* No albums message */}
          {galleryData.albums.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#FAF3E0]/60 mb-4">No gallery albums found</p>
              <p className="text-[#FAF3E0]/40">Check back soon for new content!</p>
            </div>
          )}

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
