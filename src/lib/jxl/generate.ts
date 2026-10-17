import type { Payload } from 'payload'
import { encodeJxl, getJxlWidths, JXL_SOURCE_MIME_TYPES } from './encode'
import { deleteMediaFile, readMediaFile, writeMediaFile } from './storage'

export type JxlVariantRow = {
  filename: string
  width: number
  height: number
  filesize: number
}

type MediaLike = {
  id: string | number
  filename?: string | null
  mimeType?: string | null
  width?: number | null
  jxl?: JxlVariantRow[] | null
}

/** Set on our own follow-up update so the afterChange hook does not re-run. */
export const SKIP_JXL_CONTEXT = 'skipJxl'

export const canGenerateJxl = (doc: MediaLike): boolean =>
  Boolean(doc.filename && doc.width && doc.mimeType && JXL_SOURCE_MIME_TYPES.has(doc.mimeType))

// `photo.jpg` -> `photo-jpg-640w.jxl`. The source extension is kept so
// `photo.jpg` and `photo.png` (both legal in Payload) never collide.
const variantFilename = (filename: string, width: number) => {
  const dot = filename.lastIndexOf('.')
  const base = dot > 0 ? filename.slice(0, dot) : filename
  const ext = dot > 0 ? filename.slice(dot + 1).toLowerCase() : 'img'
  return `${base}-${ext}-${width}w.jxl`
}

export const deleteJxlVariants = async (rows: JxlVariantRow[] | null | undefined) => {
  await Promise.all((rows ?? []).map((row) => deleteMediaFile(row.filename)))
}

/**
 * Encode every JXL width for a media doc, store the files next to the
 * original, and record them on the doc. Removes variants left over from a
 * previously uploaded file. `source` skips re-downloading the original.
 */
export const generateJxlForMedia = async (
  payload: Payload,
  id: string | number,
  source?: Buffer,
): Promise<JxlVariantRow[] | null> => {
  const doc = (await payload.findByID({
    collection: 'media',
    id,
    depth: 0,
    overrideAccess: true,
  })) as unknown as MediaLike

  if (!canGenerateJxl(doc)) return null
  const filename = doc.filename!
  const input = source ?? (await readMediaFile(filename))

  const rows: JxlVariantRow[] = []
  const uploads: Promise<void>[] = []
  // Encoding is CPU-bound and single-threaded, so run it sequentially and
  // overlap each upload with the next encode instead.
  for (const width of getJxlWidths(doc.width!)) {
    // eslint-disable-next-line no-await-in-loop -- sequential on purpose, see above
    const encoded = await encodeJxl(input, width)
    const name = variantFilename(filename, width)
    uploads.push(writeMediaFile(name, encoded.data))
    rows.push({ filename: name, width: encoded.width, height: encoded.height, filesize: encoded.data.length })
  }
  await Promise.all(uploads)

  const keep = new Set(rows.map((row) => row.filename))
  await deleteJxlVariants(doc.jxl?.filter((row) => !keep.has(row.filename)))

  await payload.update({
    collection: 'media',
    id,
    data: { jxl: rows } as Record<string, unknown>,
    depth: 0,
    overrideAccess: true,
    context: { [SKIP_JXL_CONTEXT]: true },
  })

  return rows
}
