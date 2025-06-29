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
      containerWithLg.lgGallery = undefined;
    }
    
    console.log(`Initializing gallery ${containerId} with ${images.length} images`);

    // Wait for DOM to be ready and ensure all images are loaded
    const initLightGallery = () => {
      if (containerWithLg.lgGallery || container.children.length === 0) {
        resolve();
        return;
      }

      try {
        // Get all links in the container
        const links = container.querySelectorAll('a');
        
        if (links.length === 0) {
          console.warn('No links found in gallery container');
          resolve();
          return;
        }

        // Initialize lightGallery
        const lgInstance = lightGallery(container, {
          plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgShare, lgAutoplay],
          selector: 'a',
          download: true,
          zoom: true,
          actualSize: true,
          showZoomInOutIcons: false,
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
          escKey: true,
          closable: true,
          mousewheel: true
        }) as LightGalleryInstance;
        
        containerWithLg.lgGallery = lgInstance;

        console.log(`Gallery ${containerId} initialized successfully with ${links.length} items`);
        resolve();
      } catch (error) {
        console.error('Error initializing lightGallery:', error);
        reject(error);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(initLightGallery, 100);
    });
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
    try {
      console.log('🌐 Fetching gallery data from PayloadCMS API');
      
      // Use relative URL - works for client-side calls
      const apiUrl = '/api/gallery-frontend';
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
