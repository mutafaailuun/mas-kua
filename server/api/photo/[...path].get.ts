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
  // path param comes as array joined by '/'
  const pathParam = getRouterParam(event, 'path')
  if (!pathParam) throw createError({ statusCode: 400, message: 'path diperlukan' })

  const key = Array.isArray(pathParam) ? pathParam.join('/') : pathParam

  try {
    const cmd = new GetObjectCommand({ Bucket: config.r2BucketName, Key: key })
    const { Body, ContentType } = await getS3(config).send(cmd)

    setHeader(event, 'Content-Type', ContentType ?? 'image/jpeg')
    setHeader(event, 'Cache-Control', 'public, max-age=86400, immutable')

    // Stream the body back to the browser
    return sendStream(event, Body as any)
  } catch (err: any) {
    throw createError({ statusCode: 404, message: 'Foto tidak ditemukan' })
  }
})
