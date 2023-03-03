require('dotenv').config()
import express from 'express';
import AWS, { S3 } from 'aws-sdk'
import cuid from 'cuid'
import bodyParser from 'body-parser';
import cors from 'cors'

const s3 = new S3()

const app = express()
app.use(express.json());

// For Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors({ origin: ['localhost:3000',] }))

const OBJECT_NAME = 'OBJECT_NAME'
const BUCKET_NAME = 'multipart-streaming'

async function initiateMultipartUpload() {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // sessionToken: `session-${cuid()}`
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

app.post('/presignedurl', async (req: express.Request, res: express.Response) => {
  console.log('req', req.body)
  const uploadId = await initiateMultipartUpload()
  if (!uploadId) throw new Error('no upload id')
  const urls = await generatePresignedUrlsParts(s3, uploadId, parseInt(req.body.parts, 10))
  console.log(urls)
  res.json({ urls })
})



app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

export default app