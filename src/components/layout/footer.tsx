"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { useWebHaptics } from "web-haptics/react";
import LocaleToggle from "@/components/layout/locale-toggle";
import { KlClock } from "@/components/layout/kl-clock";
import { NAVIGATION_LINKS } from "@/constants";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "privacy policy" },
  { href: "/terms-of-service", label: "terms of service" },
] as const;

const COLUMNS = [
  { title: "site", links: NAVIGATION_LINKS },
  { title: "legal", links: LEGAL_LINKS },
] as const;

export default function Footer() {
  const haptic = useWebHaptics();

  return (
    <footer className="border-t border-white/8 px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80 pt-12 pb-24 sm:pb-8 text-text-secondary">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        {/* Faint logo: decorative, the header logo already names the site */}
        <Image
          src="/assets/img/logo_miiyuh_v4-white.png"
          alt=""
          aria-hidden="true"
          width={2497}
          height={1080}
          sizes="(max-width: 768px) 60vw, 300px"
          className="h-auto w-[min(60vw,18.5rem)] opacity-10 select-none pointer-events-none"
        />

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-8 sm:flex sm:gap-20">
          {COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h2 className="text-xs uppercase tracking-widest text-text-muted/70">{column.title}</h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => void haptic.trigger("light")}
                      className="font-notch text-base text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Full-bleed divider: negative margins cancel the footer padding, padding restores alignment */}
      <div className="mt-10 pt-6 border-t border-white/8 -mx-8 px-8 md:-mx-16 md:px-16 lg:-mx-32 lg:px-32 xl:-mx-56 xl:px-56 2xl:-mx-80 2xl:px-80 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">
          {/* Year comes from the last (re)render; suppress the mismatch around New Year */}
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span> miiyuh, made in malaysia
        </p>
        <div className="flex items-center gap-6">
          <KlClock />
          <LocaleToggle />
        </div>
      </div>
    </footer>
  );
}
