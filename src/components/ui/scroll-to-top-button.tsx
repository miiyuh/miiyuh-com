"use client";

import { useState, useEffect, useRef } from "react";
import { useWebHaptics } from "web-haptics/react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const haptic = useWebHaptics();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 300;
        setVisible(shouldShow);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => {
    haptic.trigger("light");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-bg-primary/80 backdrop-blur-xl border border-white/12 text-white/90 shadow-lg hover:bg-white/10 transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
