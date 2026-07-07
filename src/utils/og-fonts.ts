import { readFile } from "node:fs/promises";
import path from "node:path";

let cached: Promise<{
  notchFont: ArrayBuffer;
  textFont: ArrayBuffer;
  logoDataUrl: string;
  noiseDataUrl: string;
}> | null = null;

/**
 * Loads the brand fonts + logo once per server instance and reuses them
 * across all opengraph-image routes (ImageResponse/Satori can't use the
 * next/font/google-wrapped fonts from layout.tsx directly).
 *
 * Satori's font parser can't handle the original variable-font TTFs
 * (crashes deep in its glyph table code), so these are static per-weight
 * instances produced with `fonttools varLib.instancer` from the source
 * variable fonts in this same directory.
 */
export function getOgAssets() {
  if (!cached) {
    cached = (async () => {
      const [notchFont, textFont, logoBuffer, noiseBuffer] = await Promise.all([
        readFile(path.join(process.cwd(), "src/assets/fonts/StackSansNotch-700.ttf")),
        readFile(path.join(process.cwd(), "src/assets/fonts/StackSansText-200.ttf")),
        readFile(
          path.join(process.cwd(), "public/assets/img/favicons/android-chrome-512x512.png"),
        ),
        readFile(path.join(process.cwd(), "src/assets/img/og-noise.png")),
      ]);

      return {
        notchFont: notchFont.buffer.slice(
          notchFont.byteOffset,
          notchFont.byteOffset + notchFont.byteLength,
        ) as ArrayBuffer,
        textFont: textFont.buffer.slice(
          textFont.byteOffset,
          textFont.byteOffset + textFont.byteLength,
        ) as ArrayBuffer,
        logoDataUrl: `data:image/png;base64,${logoBuffer.toString("base64")}`,
        noiseDataUrl: `data:image/png;base64,${noiseBuffer.toString("base64")}`,
      };
    })();
  }
  return cached;
}
