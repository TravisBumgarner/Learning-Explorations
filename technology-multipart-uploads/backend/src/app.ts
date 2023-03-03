import express from 'express';
import AWS from 'aws-sdk'
import cuid from 'cuid'

const app = express()

const BUCKET_NAME = 'FOO_BAR'

async function initiateMultipartUpload(key: string) {
  const s3 = new AWS.S3({
    accessKeyId: /* Bucket owner access key id */,
    secretAccessKey: /* Bucket owner secret */,
    sessionToken: `session-${cuid()}`
  })

  const params = {
    Bucket: BUCKET_NAME,
    Key: key
  }

  const res = await s3.createMultipartUpload(params).promise()

  return res.UploadId
}

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

export default app