import fs from 'node:fs/promises'
import path from 'node:path'
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

/**
 * Minimal file store for JPEG XL variants, mirroring where Payload keeps the
 * media originals: the R2 bucket when configured, otherwise `./media` (the
 * collection's `staticDir`). Keys are bare filenames, matching the S3 adapter,
 * so `/api/media/file/<name>.jxl` serves them like any other upload.
 */

const bucket = process.env.R2_BUCKET_NAME
const localDir = path.resolve('media')

let client: S3Client | undefined
const s3 = () =>
  (client ??= new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT || '',
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  }))

export const readMediaFile = async (filename: string): Promise<Buffer> => {
  if (!bucket) return fs.readFile(path.join(localDir, filename))
  const res = await s3().send(new GetObjectCommand({ Bucket: bucket, Key: filename }))
  if (!res.Body) throw new Error(`Empty body for ${filename}`)
  return Buffer.from(await res.Body.transformToByteArray())
}

export const writeMediaFile = async (filename: string, data: Buffer): Promise<void> => {
  if (!bucket) {
    await fs.mkdir(localDir, { recursive: true })
    await fs.writeFile(path.join(localDir, filename), data)
    return
  }
  await s3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: data,
      ContentType: 'image/jxl',
      CacheControl: 'public, max-age=2592000, stale-while-revalidate=86400',
    }),
  )
}

export const deleteMediaFile = async (filename: string): Promise<void> => {
  if (!bucket) {
    await fs.rm(path.join(localDir, filename), { force: true })
    return
  }
  await s3().send(new DeleteObjectCommand({ Bucket: bucket, Key: filename }))
}
