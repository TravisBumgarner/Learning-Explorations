import fs from 'fs'
import path from 'path'

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import config from './config'

const ONE_MEGABYTE = 1024 * 1024
const FIVE_MEGABYTES = 5 * ONE_MEGABYTE

const uploadStreamToS3 = async (Key: string, Body: any) => {
  try {
    const upload = new Upload({
      client: new S3Client({
        region: config.S3.Region,
        credentials: {
          accessKeyId: config.AWS.AccessKeyID,
          secretAccessKey: config.AWS.SecretAccessKey
        }
      }),
      params: {
        Bucket: config.S3.Bucket,
        Key,
        Body
      },
      queueSize: 1, // optional concurrency configuration
      partSize: FIVE_MEGABYTES, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await upload.done();
  } catch (e) {
    console.log(e);
  }
}

const main = async () => {
  let counter = 0;
  const filename = 'lorem-ipsum.txt'
  const filepath = path.join(__dirname, filename)
  const readableStream = fs.createReadStream(
    filepath,
    {
      encoding: 'utf-8',
      highWaterMark: FIVE_MEGABYTES // Controls the Chunk Size. 
    }
  );
  uploadStreamToS3(filename, readableStream)


  readableStream.on('error', function (error) {
    console.log(`error: ${error.message}`);
  })

  readableStream.on('data', async (chunk: string | Buffer) => {
    console.log(`chunk number ${counter++}`)
    
  })

  readableStream.on('close', () => {
    console.log(`Finished a total of ${counter} chunks`)
  })
}

main()