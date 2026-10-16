"use client";

import Link from "@/components/locale-link";
import { ShieldPlusIcon, HandshakeIcon } from "@phosphor-icons/react";
import { useWebHaptics } from "web-haptics/react";
import LocaleToggle from "@/components/layout/locale-toggle";
import SoundToggle from "@/components/layout/sound-toggle";

export default function Footer() {
  const haptic = useWebHaptics();
  return (
    <footer className="font-notch text-base border-t border-white/8 text-text-secondary py-8 px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left side - Copyright */}
        <p className="text-center sm:text-left">
          © 2026 miiyuh 🍁 made in malaysia! 🇲🇾
        </p>

        {/* Middle - Locale + sound preference toggles */}
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <SoundToggle />
        </div>

        {/* Right side - Legal links with icons */}
        <div className="flex gap-4">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-text-primary/90 transition-colors duration-300"
            onClick={() => haptic.trigger("light")}
          >
            <ShieldPlusIcon className="w-3 h-3" />
            privacy policy
          </Link>
          <Link
            href="/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline hover:text-text-primary/90 transition-colors duration-300"
            onClick={() => haptic.trigger("light")}
          >
            <HandshakeIcon className="w-3 h-3" />
            terms of service
          </Link>
        </div>
      </div>
    </footer>
  );
}
