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

const OBJECT_NAME = 'test-upload'
const BUCKET_NAME = 'multipart-streaming'


async function initiateMultipartUpload() {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  })

  const params = {
    Bucket: BUCKET_NAME,
    Key: OBJECT_NAME
  }

  const res = await s3.createMultipartUpload(params).promise()

  return res.UploadId
}

async function generatePresignedUrlsParts(s3: AWS.S3, uploadId: string, parts: number) {
  const baseParams = {
    Bucket: BUCKET_NAME,
    Key: OBJECT_NAME,
    UploadId: uploadId
  }

  const promises = []

  for (let index = 0; index < parts; index++) {
    promises.push(
      s3.getSignedUrlPromise('uploadPart', {
        ...baseParams,
        PartNumber: index + 1
      }))
  }

  const res = await Promise.all(promises)

  return res.reduce((map, part, index) => {
    map[index] = part
    return map
  }, {} as Record<number, string>)
}

interface Part {
  ETag: string
  PartNumber: number
}

async function completeMultiUpload(uploadId: string, parts: Part[]) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // sessionToken: `session-${cuid()}`
  })

  const params = {
    Bucket: BUCKET_NAME,
    Key: OBJECT_NAME,
    UploadId: uploadId,
    MultipartUpload: { Parts: parts }
  }

  await s3.completeMultipartUpload(params).promise()
}

app.post('/generatepresignedurl', async (req: express.Request, res: express.Response) => {
  const uploadId = await initiateMultipartUpload()
  if (!uploadId) throw new Error('no upload id')
  const urls = await generatePresignedUrlsParts(s3, uploadId, parseInt(req.body.parts, 10))
  res.json({ urls, uploadId })
})

app.post('/mergeparts', async (req: express.Request, res: express.Response) => {
  const parts = req.body.uploadedParts
  const uploadId = req.body.uploadId
  console.log('received', parts, uploadId)
  completeMultiUpload(uploadId, parts)
})



app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

export default app