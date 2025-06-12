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

export const initializeGallery = (containerId: string, images: GalleryImage[]) => {
  const container = document.getElementById(containerId);
  if (!container || !images?.length) return;

  // Check if lightGallery is already initialized and destroy it
  const containerWithLg = container as HTMLElementWithLG;
  const existingLg = containerWithLg.lgGallery;
  if (existingLg) {
    existingLg.destroy();
  }

  // Clear existing content
  container.innerHTML = '';

  images.forEach((image) => {
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
    a.innerHTML = `<img src="${src}" class="w-full rounded-lg shadow" alt="gallery image" loading="lazy">`;
    container.appendChild(a);
  });

  // Initialize lightGallery with a small delay and prevent double initialization
  setTimeout(() => {
    if (!containerWithLg.lgGallery) {
      const lgInstance = lightGallery(container, {
        plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgAutoplay, lgShare, lgPager],
        speed: 500,
        download: false,
        selector: 'a', // Explicitly set selector
      }) as LightGalleryInstance;
      // Store the instance for future reference
      containerWithLg.lgGallery = lgInstance;
    }
  }, 100);
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
