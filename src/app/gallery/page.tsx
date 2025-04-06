'use client';

import { useEffect } from 'react';
import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

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
        const insertImages = (containerId: string, images: string[]) => {
          const container = document.getElementById(containerId);
          if (container) {
            images.forEach((src) => {
              const a = document.createElement('a');
              a.href = src;
              a.innerHTML = `<img src="${src}" class="w-full rounded-lg shadow" alt="gallery image">`;
              container.appendChild(a);
            });
            lightGallery(container, { plugins: [lgZoom], speed: 500 });
          }
        };

        insertImages('lightgallery-photos', data.photos);
        insertImages('lightgallery-artworks-2022', data.artworks_2022);
        insertImages('lightgallery-artworks-2023', data.artworks_2023);
      });
  }, []);

  return (
    <div className="bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen flex flex-col">
      <header className="px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-[#FAF3E0]/20 relative">
        <div className="flex items-center justify-between">
          <a href="/">
            <img src="/assets/img/logo_miiyuh_text_white_v1.png" alt="miiyuh logo" className="h-10" />
          </a>
          <button id="menu-toggle" className="lg:hidden focus:outline-none z-50">
            <svg className="w-6 h-6 text-[#FAF3E0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul className="hidden lg:flex gap-6 text-sm font-bold">
            <li><a href="/aboutme" className="hover:underline">about me</a></li>
            <li><a href="/socials" className="hover:underline">socials</a></li>
            <li><a href="/gallery" className="hover:underline">gallery</a></li>
            <li><a href="/blog" className="hover:underline">blog</a></li>
          </ul>
        </div>
        <ul id="mobile-menu" className="hidden flex-col gap-4 text-sm font-bold bg-[#1A1A1A] px-6 py-4 mt-4 border-t border-[#FAF3E0]/20 lg:hidden absolute w-full z-40">
          <li><a href="/aboutme" className="hover:underline">about me</a></li>
          <li><a href="/socials" className="hover:underline">socials</a></li>
          <li><a href="/gallery" className="hover:underline">gallery</a></li>
          <li><a href="/blog" className="hover:underline">blog</a></li>
        </ul>
      </header>

      <main className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <section>
          <div className="mb-6">
            <h1 className="text-5xl font-bold tracking-[-0.03em] mb-2">photography 📸</h1>
            <p className="text-lg text-[#FAF3E0]/90">i dedicate this section to the photographs that i took, from both my phone and my camera.</p>
          </div>
          <h2 className="text-right font-bold text-3xl mb-4">2 0 2 2</h2>
          <div id="lightgallery-photos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
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

      <footer className="text-center text-sm text-[#FAF3E0]/70 py-6">
        <p>© 2025 miiyuh | made in malaysia!</p>
      </footer>
    </div>
  );
}
