import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';
import 'lightgallery/css/lg-share.css';

export interface GalleryImage {
  src: string;
  title?: string;
  description?: string;
}

export interface GalleryData {
  photos_2025jp?: GalleryImage[];
  artworks_2022?: GalleryImage[];
  artworks_2023?: GalleryImage[];
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

    // Clear existing content
    container.innerHTML = '';
    
    console.log(`🖼️ Initializing gallery ${containerId} with ${images.length} images`);

    // Create DOM elements immediately (faster than preloading all images)
    images.forEach((image, index) => {
      const a = document.createElement('a');
      const src = typeof image === 'string' ? image : image.src;
      const title = image.title || '';
      const description = image.description || '';

      a.href = src;
      a.setAttribute('data-sub-html', `
        <div class='text-center'>
          <h4 class='text-lg font-bold mb-1'>${title}</h4>
          <p class='text-sm'>${description}</p>
        </div>
      `);
      
      // Create image element with optimized loading
      const imgElement = document.createElement('img');
      imgElement.src = src;
      imgElement.className = 'w-full rounded-lg shadow transition-opacity duration-300';
      imgElement.alt = title || 'gallery image';
      // Use lazy loading for images after the first few
      imgElement.loading = index < 3 ? 'eager' : 'lazy';
      imgElement.style.opacity = '0';
      imgElement.style.minHeight = '200px'; // Prevent layout shift
      imgElement.style.backgroundColor = 'rgba(250, 243, 224, 0.05)'; // Placeholder color
      
      // Fade in when image loads
      imgElement.onload = () => {
        imgElement.style.opacity = '1';
      };
      
      imgElement.onerror = () => {
        console.warn(`Failed to load image: ${src}`);
        imgElement.style.opacity = '0.5';
        imgElement.alt = 'Failed to load image';
      };
      
      a.appendChild(imgElement);
      container.appendChild(a);
    });

    // Initialize lightGallery with optimized settings
    setTimeout(() => {
      if (!containerWithLg.lgGallery && container.children.length > 0) {
        try {
          const lgInstance = lightGallery(container, {
            plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgShare], // Removed autoplay and pager for speed
            speed: 300, // Faster transitions
            download: false,
            selector: 'a',
            preload: 1, // Reduced preload for speed
            hideControlOnEnd: true,
            closable: true,
            mousewheel: true,
            loadYouTubeThumbnail: false, // Disable if not needed
            youTubePlayerParams: false,
            vimeoPlayerParams: false,
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
    }, 100); // Reduced delay
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
      console.log('🌐 Fetching gallery data from server');
      const response = await fetch('/gallery.json', {
        // Add cache headers for better performance
        headers: {
          'Cache-Control': 'public, max-age=300' // 5 minutes cache
        }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch gallery data`);
      
      const data = await response.json();
      galleryDataCache = data; // Cache the result
      console.log('✅ Gallery data fetched and cached');
      return data;
    } catch (error) {
      console.error('❌ Error loading gallery.json:', error);
      galleryDataPromise = null; // Reset promise on error
      return {};
    }
  })();

  return galleryDataPromise;
};
