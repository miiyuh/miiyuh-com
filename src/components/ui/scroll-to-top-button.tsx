"use client";

import { useState, useEffect, useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const haptic = useWebHaptics();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    haptic.trigger("light");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [haptic]);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      // Hidden state is visual only, so the control stayed tabbable and exposed
      // to assistive tech while invisible.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-8 bottom-8 z-50 cursor-pointer p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white shadow-lg hover:bg-white/15 active:scale-90 transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUpIcon className="w-5 h-5" weight="bold" />
    </button>
  );
}
