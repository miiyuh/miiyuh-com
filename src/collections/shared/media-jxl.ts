import { after } from 'next/server'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import {
  canGenerateJxl,
  deleteJxlVariants,
  generateJxlForMedia,
  SKIP_JXL_CONTEXT,
  type JxlVariantRow,
} from '../../lib/jxl/generate'

/**
 * Generate JPEG XL variants whenever a new file lands on a media doc.
 *
 * Encoding takes several seconds, so it is deferred with `after()` and the
 * upload response returns immediately; outside a request scope (Local API
 * scripts) `after()` throws and we encode inline instead. The deferred job
 * uses a fresh Local API call rather than `req`, whose transaction has ended
 * by then.
 */
export const generateJxlAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
  context,
}) => {
  if (context[SKIP_JXL_CONTEXT]) return doc
  const fileChanged = operation === 'create' || doc.filename !== previousDoc?.filename
  if (!fileChanged || !canGenerateJxl(doc)) return doc

  const { payload } = req
  const source = Buffer.isBuffer(req.file?.data) && req.file.data.length > 0 ? req.file.data : undefined
  const run = () =>
    generateJxlForMedia(payload, doc.id, source).catch((err: unknown) => {
      payload.logger.error({ err, msg: `JPEG XL generation failed for media ${doc.id}` })
    })

  try {
    after(run)
  } catch {
    await run()
  }
  return doc
}

export const deleteJxlAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    await deleteJxlVariants(doc.jxl as JxlVariantRow[] | undefined)
  } catch (err) {
    req.payload.logger.error({ err, msg: `Failed to delete JPEG XL variants for media ${doc.id}` })
  }
}
