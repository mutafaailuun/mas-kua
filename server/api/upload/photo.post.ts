import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

let s3: S3Client | null = null

const getS3 = () => {
  if (s3) return s3
  const config = useRuntimeConfig()
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

  if (!config.r2AccountId || !config.r2AccessKeyId || !config.r2SecretAccessKey) {
    throw createError({ statusCode: 500, message: 'Konfigurasi R2 belum diisi di .env' })
  }

  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, message: 'Tidak ada file yang dikirim' })
  }

  const filePart = parts.find(p => p.name === 'file')
  const folderPart = parts.find(p => p.name === 'folder')

  if (!filePart?.data || !filePart.filename) {
    throw createError({ statusCode: 400, message: 'Field "file" diperlukan' })
  }

  const folder = folderPart?.data?.toString() ?? 'wedding-docs'
  const ext = filePart.filename.split('.').pop() ?? 'jpg'
  const key = `${folder}/${Date.now()}.${ext}`

  await getS3().send(new PutObjectCommand({
    Bucket: config.r2BucketName,
    Key: key,
    Body: filePart.data,
    ContentType: filePart.type ?? 'image/jpeg',
  }))

  // Use server-proxied URL to avoid R2 public SSL issues
  const publicUrl = `/api/photo/${key}`

  return { publicUrl, key }
})
