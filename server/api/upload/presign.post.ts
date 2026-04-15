import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { filename, contentType, folder } = body as {
    filename: string
    contentType: string
    folder: string
  }

  if (!filename || !contentType || !folder) {
    throw createError({ statusCode: 400, message: 'filename, contentType, folder diperlukan' })
  }

  if (!config.r2AccountId || !config.r2AccessKeyId || !config.r2SecretAccessKey) {
    throw createError({ statusCode: 500, message: 'Konfigurasi R2 belum diatur di environment variables' })
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  })

  const ext = filename.split('.').pop() ?? 'jpg'
  const key = `${folder}/${Date.now()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: config.r2BucketName,
    Key: key,
    ContentType: contentType,
  })

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 })

  const publicUrl = config.public.r2PublicUrl
    ? `${config.public.r2PublicUrl.replace(/\/$/, '')}/${key}`
    : null

  return { signedUrl, key, publicUrl }
})
