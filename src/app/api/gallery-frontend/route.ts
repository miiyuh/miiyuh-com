import { NextResponse } from 'next/server';
import type { Gallery, Media } from '../../../../payload-types';

interface ProcessedAlbum {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  slug: string;
  images: Array<{
    src: string;
    fullSrc: string;
    alt: string;
    title: string;
    description: string;
    caption: string;
  }>;
}

export async function GET() {
  try {
    console.log('🖼️ Gallery Frontend API: Fetching albums from PayloadCMS...');
    
    // Import payload config and get payload instance
    const { getPayloadHMR } = await import('@payloadcms/next/utilities');
    const configPromise = await import('../../../../payload.config');
    const payload = await getPayloadHMR({ config: configPromise.default });
    
    // Fetch albums directly from PayloadCMS
    const albumsData = await payload.find({
      collection: 'gallery',
      limit: 1000, // Get all albums
      sort: '-createdAt', // Sort by newest first
      where: {
        status: {
          equals: 'published',
        },
      },
    });

    console.log('📚 Raw albums data:', JSON.stringify(albumsData, null, 2));

    if (!albumsData.docs || !Array.isArray(albumsData.docs)) {
      console.error('❌ Invalid albums data structure:', albumsData);
      throw new Error('Invalid albums data structure');
    }

    // Transform albums into the expected format
    const albums: ProcessedAlbum[] = albumsData.docs.map((album: Gallery) => {
      console.log('🔄 Processing album:', album.title, 'with', album.images?.length || 0, 'images');
      
      return {
        id: album.id,
        title: album.title,
        category: album.category || 'photography',
        date: album.publishedDate || album.createdAt,
        description: album.description || '',
        slug: album.id,
        images: (album.images || []).map((imageItem) => {
          // Handle the nested structure where image data is in imageItem.image
          console.log('📷 Raw imageItem:', JSON.stringify(imageItem, null, 2));
          
          const image = typeof imageItem.image === 'string' ? imageItem.image : imageItem.image as Media;
          
          console.log('🔍 Extracted image:', JSON.stringify(image, null, 2));
          
          // For grid display, prefer tablet size (1024x1024) for better quality 1:1 aspect ratio
          // Fall back to thumbnail, then original image
          let gridImageUrl = typeof image === 'string' ? image : 
                              (image?.sizes?.tablet?.url || 
                              image?.sizes?.thumbnail?.url || 
                              image?.url || 
                              image?.filename || '');
          
          // For lightbox, use the original full-size image
          let fullImageUrl = typeof image === 'string' ? image : 
                              (image?.url || 
                              image?.filename || '');
          
          // Convert proxy URLs to direct Blob URLs
          if (gridImageUrl.includes('/api/media/file/') && typeof image === 'object' && image.filename) {
            // For sized images, construct the expected Blob URL with size suffix
            if (image.sizes?.tablet?.filename) {
              const expectedBlobUrl = `https://tavt1iz2ukisuwtc.public.blob.vercel-storage.com/${image.sizes.tablet.filename}`;
              console.log('🔄 Converting proxy URL to Blob URL for tablet size:', gridImageUrl, '->', expectedBlobUrl);
              gridImageUrl = expectedBlobUrl;
            } else {
              const expectedBlobUrl = `https://tavt1iz2ukisuwtc.public.blob.vercel-storage.com/${image.filename}`;
              console.log('🔄 Converting proxy URL to Blob URL for grid:', gridImageUrl, '->', expectedBlobUrl);
              gridImageUrl = expectedBlobUrl;
            }
          }
          
          if (fullImageUrl.includes('/api/media/file/') && typeof image === 'object' && image.filename) {
            const expectedBlobUrl = `https://tavt1iz2ukisuwtc.public.blob.vercel-storage.com/${image.filename}`;
            console.log('🔄 Converting proxy URL to Blob URL for full:', fullImageUrl, '->', expectedBlobUrl);
            fullImageUrl = expectedBlobUrl;
          }
          
          console.log('🖼️ Final grid image URL:', gridImageUrl);
          console.log('🔍 Final full image URL:', fullImageUrl);
          
          return {
            src: gridImageUrl, // Use for grid display (1:1 aspect ratio)
            fullSrc: fullImageUrl, // Use for lightbox (full resolution)
            alt: typeof image === 'object' ? (image.alt || album.title) : album.title,
            title: imageItem.caption || '',
            description: imageItem.caption || '',
            caption: imageItem.caption || '',
          };
        }),
      };
    });

    // Sort albums by date (newest first)
    albums.sort((a: ProcessedAlbum, b: ProcessedAlbum) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const response = {
      albums,
      totalAlbums: albums.length,
      totalImages: albums.reduce((sum: number, album: ProcessedAlbum) => sum + album.images.length, 0),
    };

    console.log('✅ Gallery Frontend API: Returning', albums.length, 'albums with', response.totalImages, 'total images');
    console.log('📋 Albums summary:', albums.map((a: ProcessedAlbum) => `"${a.title}" (${a.category}, ${a.images.length} images)`));

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Gallery Frontend API Error:', error);
    
    // Return empty data structure on error
    return NextResponse.json({
      albums: [],
      totalAlbums: 0,
      totalImages: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500
    });
  }
}
