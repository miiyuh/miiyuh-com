import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgRotate from 'lightgallery/plugins/rotate';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgShare from 'lightgallery/plugins/share';
import lgPager from 'lightgallery/plugins/pager';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-rotate.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-pager.css';

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

    // Preload all images before initializing lightGallery
    const imagePromises = images.map((image) => {
      return new Promise<{ image: GalleryImage; loaded: boolean }>((resolveImage) => {
        const img = new Image();
        const src = typeof image === 'string' ? image : image.src;
        
        img.onload = () => {
          resolveImage({ image, loaded: true });
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          resolveImage({ image, loaded: false });
        };
        
        // Set a timeout to avoid hanging on slow images
        setTimeout(() => {
          if (!img.complete) {
            console.warn(`Image loading timeout: ${src}`);
            resolveImage({ image, loaded: false });
          }
        }, 10000); // 10 second timeout
        
        img.src = src;
      });
    });

    // Wait for all images to load (or timeout) before creating DOM elements
    Promise.all(imagePromises).then((results) => {
      const loadedImages = results.filter(result => result.loaded);
      
      if (loadedImages.length === 0) {
        console.error('No images could be loaded for gallery:', containerId);
        container.innerHTML = '<p class="text-[#FAF3E0]/50 text-center py-8">Unable to load images</p>';
        resolve();
        return;
      }

      // Create DOM elements for successfully loaded images
      loadedImages.forEach(({ image }) => {
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
        
        // Create image element with proper loading attributes
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.className = 'w-full rounded-lg shadow transition-opacity duration-300';
        imgElement.alt = title || 'gallery image';
        imgElement.loading = 'eager'; // Changed from lazy since we're preloading
        imgElement.style.opacity = '0';
        
        // Fade in when image is ready
        imgElement.onload = () => {
          imgElement.style.opacity = '1';
        };
        
        a.appendChild(imgElement);
        container.appendChild(a);
      });

      // Initialize lightGallery after DOM elements are created and images are preloaded
      setTimeout(() => {
        if (!containerWithLg.lgGallery && container.children.length > 0) {
          try {
            const lgInstance = lightGallery(container, {
              plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgAutoplay, lgShare, lgPager],
              speed: 500,
              download: false,
              selector: 'a',
              preload: 2, // Preload next 2 images
              hideControlOnEnd: true,
              closable: true,
              mousewheel: true,
            }) as LightGalleryInstance;
            
            containerWithLg.lgGallery = lgInstance;
            resolve();
          } catch (error) {
            console.error('Error initializing lightGallery:', error);
            reject(error);
          }
        } else {
          resolve();
        }
      }, 200); // Slightly longer delay to ensure DOM is ready
    }).catch((error) => {
      console.error('Error in image preloading:', error);
      container.innerHTML = '<p class="text-[#FAF3E0]/50 text-center py-8">Error loading gallery</p>';
      reject(error);
    });
  });
};

export const loadGalleryData = async (): Promise<GalleryData> => {
  try {
    const response = await fetch('/gallery.json');
    if (!response.ok) throw new Error('Failed to fetch gallery data');
    return await response.json();
  } catch (error) {
    console.error('Error loading gallery.json:', error);
    return {};
  }
};
