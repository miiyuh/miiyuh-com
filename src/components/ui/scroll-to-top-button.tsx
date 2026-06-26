"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32);
  const rafRef = useRef<number | null>(null);
  const haptic = useWebHaptics();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setVisible(scrollY > 300);

        const footer = document.querySelector("footer");
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const viewportH = window.innerHeight;

          if (footerRect.top < viewportH) {
            const offset = viewportH - footerRect.top + 16;
            setBottomOffset(Math.max(32, offset));
          } else {
            setBottomOffset(32);
          }
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    haptic.trigger("light");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [haptic]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-8 z-50 p-3 rounded-full bg-bg-primary/80 backdrop-blur-xl border border-white/12 text-white/90 shadow-lg hover:bg-white/10 transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ bottom: `${bottomOffset}px` }}
    >
      ↑
    </button>
  );
}
