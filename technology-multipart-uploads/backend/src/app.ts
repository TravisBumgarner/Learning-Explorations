require('dotenv').config()
import express from 'express';
import AWS from 'aws-sdk' // Note for some reason, need to change .zshrc/ aws_profile params to `demos` which is what is stored in ~/.aws/credentials
import cuid from 'cuid'
import cors from 'cors'

var s3 = new AWS.S3({ signatureVersion: 'v4' });

const app = express()
app.use(express.json());

// For Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors({ origin: ['localhost:3000',] }))

const BUCKET_NAME = 'multipart-streaming'


async function initiateMultipartUpload(s3Key: string) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  })

  const params = {
    Bucket: BUCKET_NAME,
    Key: s3Key
  }

  const res = await s3.createMultipartUpload(params).promise()

  return res.UploadId
}

async function generatePresignedUrlsPart({ s3, uploadId, s3Key, index }: { s3: AWS.S3, uploadId: string, s3Key: string, index: number }) {
  const baseParams = {
    Bucket: BUCKET_NAME,
    Key: s3Key,
    UploadId: uploadId
  }

  return await s3.getSignedUrlPromise('uploadPart', {
    ...baseParams,
    PartNumber: index + 1 // Parts start at 1.
  })
}

interface Part {
  ETag: string
  PartNumber: number
}

async function completeMultiUpload({ uploadId, uploadedParts, s3Key }: { uploadId: string, uploadedParts: Part[], s3Key: string }) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  })

  const params = {
    Bucket: BUCKET_NAME,
    Key: s3Key,
    UploadId: uploadId,
    MultipartUpload: { Parts: uploadedParts }
  }

  await s3.completeMultipartUpload(params).promise()
}

app.post('/initiate_multipart_upload', async (req: express.Request, res: express.Response) => {
  const uploadId = await initiateMultipartUpload(req.body.s3Key)
  res.json({ uploadId })
})

app.post('/generate_presigned_url', async (req: express.Request, res: express.Response) => {
  console.log(req.body)
  const { s3Key, uploadId, index } = req.body
  const url = await generatePresignedUrlsPart({ s3Key, uploadId, index, s3 })
  res.json({ url })
})

app.post('/merge_parts', async (req: express.Request, res: express.Response) => {
  const { uploadId, uploadedParts, s3Key } = req.body
  console.log(uploadId, uploadedParts, s3Key)
  completeMultiUpload({ uploadId, uploadedParts, s3Key })
})



app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

export default app