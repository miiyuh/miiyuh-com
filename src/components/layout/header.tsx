"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { NAVIGATION_LINKS } from "@/constants";
import { useWebHaptics } from "web-haptics/react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import LocaleToggle from "@/components/layout/locale-toggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const haptic = useWebHaptics();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    haptic.trigger("light");
    setMenuOpen((prev) => !prev);
  }, [haptic]);
  const closeMenu = useCallback(() => {
    haptic.trigger("light");
    setMenuOpen(false);
  }, [haptic]);

  useFocusTrap(mobileMenuRef, menuOpen, closeMenu);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="bg-bg-primary/80 backdrop-blur-xl px-8 md:px-32 lg:px-56 xl:px-80 py-4 border-b border-white/8 relative z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/assets/img/logo_miiyuh_v4-white.png"
              alt="miiyuh - return to homepage"
              width={128}
              height={32}
              className="h-8 w-auto"
              priority
              quality={75}
              sizes="160px"
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-50 relative min-w-11 min-h-11 flex items-center justify-center -mr-2"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M4 6h16"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 200ms ease-in-out",
                }}
              />
              <path
                d="M4 12h16"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 200ms ease-in-out",
                }}
              />
              <path
                d="M4 18h16"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 200ms ease-in-out",
                }}
              />
              <line
                x1="5"
                y1="5"
                x2="19"
                y2="19"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transition: "opacity 200ms ease-in-out",
                }}
              />
              <line
                x1="19"
                y1="5"
                x2="5"
                y2="19"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transition: "opacity 200ms ease-in-out",
                }}
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-8 text-xl font-serif">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:underline"
                    onClick={() => haptic.trigger("light")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <LocaleToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay — rendered outside header to avoid stacking context issues */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal={menuOpen ? "true" : undefined}
        aria-label="Navigation menu"
        className={`fixed inset-0 z-30 bg-bg-primary/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <ul className="flex flex-col gap-8 text-5xl font-serif text-left">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="hover:text-accent-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <LocaleToggle />
        </div>
      </div>
    </>
  );
}
