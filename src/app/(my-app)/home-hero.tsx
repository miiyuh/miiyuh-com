"use client";

import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_LINKS, SOCIAL_PLATFORMS } from "@/constants";
import {
  MapPinIcon,
  CodeIcon,
  CameraIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import { useWebHaptics } from "web-haptics/react";

function formatPlatformName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).replace("_", " ");
}

export default function HomeHero() {
  const haptic = useWebHaptics();

  return (
    <>
      {/* Hero Section: Portrait + Bio + Social Links */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Portrait - Full width mobile/tablet, column 1 desktop */}
        <div className="flex justify-center items-start w-full lg:w-auto lg:col-span-1">
          <div className="relative w-48 h-48 lg:w-full lg:h-full lg:aspect-square rounded-full overflow-hidden border border-white/8 shrink-0">
            <Image
              src="/assets/img/personal-profile-pic.png"
              alt="Portrait of Muhamad Azri"
              fill
              className="object-cover"
              quality={100}
              priority
              sizes="(max-width: 1024px) 192px, (max-width: 1280px) 216px, 296px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Bio + Tags + Socials - Full width mobile/tablet, spans 3 columns desktop */}
        <div className="flex flex-col gap-4 md:gap-5 w-full lg:col-span-3 lg:h-full lg:justify-between">
          {/* Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-notch tracking-tight text-text-primary leading-[1.1] text-balance">
            Muhamad Azri
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-lg text-text-secondary leading-relaxed font-light text-pretty wrap-break-word">
            Fresh graduate, creative developer, and photographer. Advocating
            for better policy, governance, and urban life in Malaysia.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 md:gap-2.5 justify-start md:justify-start">
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white/5 border border-white/5 text-xs md:text-sm text-text-secondary font-serif">
              <MapPinIcon className="w-3 md:w-4 h-3 md:h-4 text-text-muted" aria-hidden="true" />
              Malaysia
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white/5 border border-white/5 text-xs md:text-sm text-text-secondary font-serif">
              <CodeIcon className="w-3 md:w-4 h-3 md:h-4 text-text-muted" aria-hidden="true" />
              Developer
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-white/5 border border-white/5 text-xs md:text-sm text-text-secondary font-serif">
              <CameraIcon className="w-3 md:w-4 h-3 md:h-4 text-text-muted" aria-hidden="true" />
              Photographer
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 md:gap-2 justify-start">
            {SOCIAL_PLATFORMS.map((social) => (
              <a
                key={social}
                href={`/${social}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center min-w-11 min-h-11"
                onClick={() => haptic.trigger("light")}
                aria-label={`${formatPlatformName(social)} profile`}
              >
                <Image
                  src={`/assets/img/social_media_icons/${social}.png`}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                  quality={80}
                  sizes="24px"
                />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white/20 backdrop-blur text-text-primary text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {formatPlatformName(social)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:100ms]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NAVIGATION_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col h-full p-6 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all duration-300 animate-stagger-item"
              style={{ "--i": index } as React.CSSProperties}
              onClick={() => haptic.trigger("medium")}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-notch text-xl text-text-primary group-hover:text-accent-primary transition-colors">
                  {link.label}
                </h3>
                <ArrowUpRightIcon className="w-8 h-8 text-text-muted group-hover:text-accent-primary transition-colors shrink-0" aria-hidden="true" />
              </div>
              <p className="text-xs text-text-secondary">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
