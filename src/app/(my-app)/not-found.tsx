import Link from "next/link";
import { NAVIGATION_LINKS } from "@/constants";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-8 md:px-32 lg:px-56 xl:px-80 py-12">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <h1 className="text-6xl md:text-8xl font-serif text-text-primary">
          404
        </h1>
        <p className="text-lg md:text-xl text-text-secondary font-light">
          page not found
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-text-primary hover:bg-white/10 transition-colors duration-300 font-serif"
        >
          go home
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 mt-4">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 underline underline-offset-4 decoration-white/20"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
