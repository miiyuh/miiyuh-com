import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';
import lgAutoplay from 'lightgallery/plugins/autoplay';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-autoplay.css';

export interface GalleryImage {
  src: string;
  fullSrc?: string;
  title?: string;
  description?: string;
  alt?: string;
  caption?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description?: string;
  category: 'photography' | 'artwork' | 'digital-art';
  publishedDate?: string;
  images: GalleryImage[];
  slug: string;
}

export interface GalleryData {
  albums: GalleryAlbum[];
  _meta?: {
    source: 'payloadcms' | 'fallback' | 'static';
    total?: number;
  };
}

// Type for lightGallery instance
interface LightGalleryInstance {
  destroy: () => void;
}

// Extended HTMLElement type with lightGallery instance
interface HTMLElementWithLG extends HTMLElement {
  lgGallery?: LightGalleryInstance;
}

export const initializeGallery = async (containerId: string, images: GalleryImage[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const container = document.getElementById(containerId);
    if (!container || !images?.length) {
      resolve();
      return;
    }

    // Check if lightGallery is already initialized and destroy it
    const containerWithLg = container as HTMLElementWithLG;
    const existingLg = containerWithLg.lgGallery;
    if (existingLg) {
      existingLg.destroy();
    }
    
    console.log(`🖼️ Initializing gallery ${containerId} with ${images.length} images`);

    // Initialize lightGallery with minimal, working configuration
    setTimeout(() => {
      if (!containerWithLg.lgGallery && container.children.length > 0) {
        try {
          const lgInstance = lightGallery(container, {
            plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgShare, lgAutoplay],
            selector: 'a',
            download: true,
            zoom: true,
            actualSize: true,
            showZoomInOutIcons: false, // Use only actualSize button instead of separate zoom in/out
            thumbnail: true,
            toggleThumb: true,
            fullScreen: true,
            rotate: true,
            rotateLeft: true,
            rotateRight: true,
            flipHorizontal: true,
            flipVertical: true,
            share: true,
            autoplay: false,
            autoplayControls: true,
            loop: true,
            controls: true,
            counter: true,
            escKey: true
          }) as LightGalleryInstance;
          
          containerWithLg.lgGallery = lgInstance;
          console.log(`✅ Gallery ${containerId} initialized successfully`);
          resolve();
        } catch (error) {
          console.error('Error initializing lightGallery:', error);
          reject(error);
        }
      } else {
        resolve();
      }
    }, 100);
  });
};

// Cache for gallery data to avoid repeated requests
let galleryDataCache: GalleryData | null = null;
let galleryDataPromise: Promise<GalleryData> | null = null;

export const loadGalleryData = async (): Promise<GalleryData> => {
  // Return cached data if available
  if (galleryDataCache) {
    console.log('📦 Using cached gallery data');
    return galleryDataCache;
  }

  // Return existing promise if one is already in progress
  if (galleryDataPromise) {
    console.log('⏳ Waiting for existing gallery data request');
    return galleryDataPromise;
  }

  // Create new promise for fresh data
  galleryDataPromise = (async () => {
    // Determine the base URL for server-side vs client-side
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      : '';
    
    try {
      console.log('🌐 Fetching gallery data from PayloadCMS API');
      
      const apiUrl = `${baseUrl}/api/gallery-frontend`;
      console.log('🔗 API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        // Add cache headers for better performance
        headers: {
          'Cache-Control': 'public, max-age=300' // 5 minutes cache
        }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch gallery data`);
      
      const data: GalleryData = await response.json();
      
      if (!data.albums || !Array.isArray(data.albums)) {
        throw new Error('Invalid data structure received from API');
      }
      
      galleryDataCache = data; // Cache the result
      console.log('✅ Gallery data fetched from PayloadCMS and cached');
      
      return data;
    } catch (error) {
      console.error('❌ Error loading gallery data from API:', error);
      
      // Return empty gallery data as fallback
      const fallbackData: GalleryData = {
        albums: [],
        _meta: {
          source: 'fallback',
          total: 0
        }
      };
      
      galleryDataCache = fallbackData;
      galleryDataPromise = null; // Reset promise on error
      console.log('⚠️ Using empty fallback gallery data');
      return fallbackData;
    }
  })();

  return galleryDataPromise;
};
