import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

let s3: S3Client | null = null

const getS3 = (config: ReturnType<typeof useRuntimeConfig>) => {
  if (s3) return s3
  s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  })
  return s3
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Extract key from URL path directly — more reliable than getRouterParam
  const rawPath = getRequestURL(event).pathname
  const key = rawPath.replace(/^\/api\/photo\//, '')

  if (!key) throw createError({ statusCode: 400, message: 'key diperlukan' })

  try {
    const { Body, ContentType } = await getS3(config).send(
      new GetObjectCommand({ Bucket: config.r2BucketName, Key: key })
    )

    if (!Body) throw new Error('Empty body')

    // Collect stream into buffer (compatible with all Nuxt/h3 versions)
    const chunks: Uint8Array[] = []
    for await (const chunk of Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    setHeader(event, 'Content-Type', ContentType ?? 'image/jpeg')
    setHeader(event, 'Content-Length', buffer.length)
    setHeader(event, 'Cache-Control', 'public, max-age=86400, immutable')

    return buffer
  } catch (err: any) {
    console.error('[photo proxy] error key=%s msg=%s', key, err?.message)
    throw createError({ statusCode: 404, message: 'Foto tidak ditemukan' })
  }
})
