import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import encode, { init } from '@jsquash/jxl/encode.js'

/**
 * Target widths for JPEG XL variants. Every variant is an uncropped resize of
 * the original so they can share one `srcset` (Payload's `thumbnail`/`card`
 * sizes are cropped and would break that). Subset of `images.deviceSizes`.
 */
export const JXL_WIDTHS = [384, 640, 1080, 1920] as const

/**
 * quality 90 = libjxl distance 1.0, its "visually lossless" default.
 * effort 5 measured ~35% faster than 7 with no size penalty at these widths
 * (1920w photo: 4.7s / 536KB vs 7.1s / 546KB, single-threaded WASM).
 */
const ENCODE_OPTIONS = { quality: 90, effort: 5, progressive: true } as const

/** Source formats sharp can decode with the prebuilt libvips. */
export const JXL_SOURCE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/tiff',
])

let ready: Promise<unknown> | undefined

// Load the WASM explicitly: emscripten's own loader resolves it via
// import.meta.url, which does not survive bundling into a server function.
// A plain path (not require.resolve) so the bundler leaves it alone; Vercel
// ships the file via outputFileTracingIncludes in next.config.mjs.
const WASM_PATH = path.join(process.cwd(), 'node_modules/@jsquash/jxl/codec/enc/jxl_enc.wasm')

const ensureEncoder = () => {
  ready ??= (async () => {
    const wasm = await fs.readFile(WASM_PATH)
    return init(await WebAssembly.compile(wasm))
  })()
  return ready
}

/** Widths to generate for an original of `sourceWidth`, never upscaling. */
export const getJxlWidths = (sourceWidth: number): number[] => {
  const widths: number[] = JXL_WIDTHS.filter((w) => w < sourceWidth)
  const top = Math.min(sourceWidth, JXL_WIDTHS[JXL_WIDTHS.length - 1])
  if (!widths.includes(top)) widths.push(top)
  return widths
}

export type EncodedJxl = { width: number; height: number; data: Buffer }

/** Resize `source` to `width` and encode it as JPEG XL. */
export const encodeJxl = async (source: Buffer, width: number): Promise<EncodedJxl> => {
  await ensureEncoder()
  const { data, info } = await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .toColourspace('srgb')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const out = await encode(
    {
      data: new Uint8ClampedArray(data.buffer, data.byteOffset, data.length),
      width: info.width,
      height: info.height,
      colorSpace: 'srgb',
    },
    ENCODE_OPTIONS,
  )

  return { width: info.width, height: info.height, data: Buffer.from(out) }
}
