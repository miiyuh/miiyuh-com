'use client';

import { useEffect } from 'react';
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

export default function GalleryPage() {
  useEffect(() => {
    const toggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const isClickInside = mobileMenu.contains(target) || toggleBtn.contains(target);
        if (!isClickInside) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }
      });
    }

    fetch('/gallery.json')
    .then((res) => res.json())
    .then((data) => {
      const insertImages = (containerId: string, images?: { src: string; title?: string; description?: string }[]) => {
        const container = document.getElementById(containerId);
        if (container && images && images.length > 0) {
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
            a.innerHTML = `<img src="${src}" class="w-full rounded-lg shadow" alt="gallery image">`;
            container.appendChild(a);
          });
  
          setTimeout(() => {
            lightGallery(container, {
              plugins: [lgZoom, lgThumbnail, lgFullscreen, lgRotate, lgAutoplay, lgShare, lgPager],
              speed: 500,
            });
          }, 100);
        }
      };
  
      if (data.photos_2025jp) {
        insertImages('lightgallery-photos-2025jp', data.photos_2025jp);
      }
      if (data.artworks_2022) {
        insertImages('lightgallery-artworks-2022', data.artworks_2022);
      }
      if (data.artworks_2023) {
        insertImages('lightgallery-artworks-2023', data.artworks_2023);
      }
    })
    .catch((error) => {
      console.error('Error loading gallery.json:', error);
    });
  }, []);

  return (
    <div className="bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen flex flex-col">

      <main className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <section>
          <div className="mb-6">
            <h1 className="text-5xl font-bold tracking-[-0.03em] mb-2">photography 📸</h1>
            <p className="text-lg text-[#FAF3E0]/90">i dedicate this section to the photographs that i took, from both my phone and my camera.</p>
          </div>
          <h2 className="text-right font-bold text-3xl mb-4">2025 japan trip 🇯🇵</h2>
          <div id="lightgallery-photos-2025jp" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <h1 className="text-5xl font-bold tracking-[-0.03em] mb-2">artwork 🎨</h1>
            <p className="text-lg text-[#FAF3E0]/90">i am still learning on how to draw, so most of these are referenced on other peoples artworks.</p>
          </div>
          <h2 className="text-right font-bold text-3xl mb-4">2 0 2 2</h2>
          <div id="lightgallery-artworks-2022" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"></div>

          <h2 className="text-right font-bold text-3xl mt-8 mb-4">2 0 2 3</h2>
          <div id="lightgallery-artworks-2023" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
        </section>
      </main>
    </div>
  );
}