import { NextResponse } from 'next/server';

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000';

interface PayloadImageItem {
  id: string;
  image: PayloadImage;
}

interface PayloadImage {
  id: string;
  url?: string;
  filename?: string;
  alt?: string;
  title?: string;
  caption?: string;
  description?: string;
  thumbnailURL?: string;
  sizes?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    card?: {
      url: string;
      width: number;
      height: number;
    };
    tablet?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface PayloadAlbum {
  id: string;
  title: string;
  category?: string;
  date?: string;
  createdAt: string;
  description?: string;
  images?: (PayloadImageItem | PayloadImage | string)[];
}

interface PayloadResponse {
  docs: PayloadAlbum[];
}

interface ProcessedAlbum {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  images: Array<{
    src: string;
    fullSrc: string;
    title: string;
    description: string;
    alt: string;
    caption?: string;
  }>;
  slug: string;
}

export async function GET() {
  try {
    console.log('🖼️ Gallery Frontend API: Fetching albums from PayloadCMS...');
    
    // Fetch albums from PayloadCMS
    const albumsResponse = await fetch(`${PAYLOAD_API_URL}/api/gallery`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!albumsResponse.ok) {
      console.error('❌ Failed to fetch albums from PayloadCMS:', albumsResponse.status);
      throw new Error(`Failed to fetch albums: ${albumsResponse.status}`);
    }

    const albumsData: PayloadResponse = await albumsResponse.json();
    console.log('📚 Raw albums data:', JSON.stringify(albumsData, null, 2));

    if (!albumsData.docs || !Array.isArray(albumsData.docs)) {
      console.error('❌ Invalid albums data structure:', albumsData);
      throw new Error('Invalid albums data structure');
    }

    // Transform albums into the expected format
    const albums: ProcessedAlbum[] = albumsData.docs.map((album: PayloadAlbum) => {
      console.log('🔄 Processing album:', album.title, 'with', album.images?.length || 0, 'images');
      
      return {
        id: album.id,
        title: album.title,
        category: album.category || 'photography',
        date: album.date || album.createdAt,
        description: album.description || '',
        slug: album.id,
        images: (album.images || []).map((imageItem: PayloadImageItem | PayloadImage | string) => {
          // Handle the nested structure where image data is in imageItem.image
          console.log('📷 Raw imageItem:', JSON.stringify(imageItem, null, 2));
          
          const image = typeof imageItem === 'string' ? imageItem : 
                       ('image' in imageItem) ? imageItem.image : imageItem;
          
          console.log('🔍 Extracted image:', JSON.stringify(image, null, 2));
          
          // For grid display, prefer tablet size (1024x1024) for better quality 1:1 aspect ratio
          // Fall back to thumbnail, then original image
          const gridImageUrl = typeof image === 'string' ? image : 
                              image?.sizes?.tablet?.url || 
                              image?.thumbnailURL || 
                              image?.url || 
                              image?.filename || '';
          
          // For lightbox, use the original full-size image
          const fullImageUrl = typeof image === 'string' ? image : 
                              image?.url || 
                              image?.filename || '';
          
          console.log('🖼️ Processing grid image URL:', gridImageUrl);
          console.log('🔍 Processing full image URL:', fullImageUrl);
          
          return {
            src: gridImageUrl, // Use for grid display (1:1 aspect ratio)
            fullSrc: fullImageUrl, // Use for lightbox (full resolution)
            alt: typeof image === 'object' ? (image.alt || album.title) : album.title,
            title: typeof image === 'object' ? (image.caption || image.alt || '') : '',
            description: typeof image === 'object' ? (image.description || image.caption || '') : '',
            caption: typeof image === 'object' ? (image.caption || image.alt || '') : '',
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
