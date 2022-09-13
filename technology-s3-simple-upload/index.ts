import config from './config'

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

const uploadFile = async (Key: string, Body: string | ReadableStream<any> | Blob | Uint8Array | Buffer | undefined, ) => {
    try {
        const parallelUploads3 = new Upload({
          client: new S3Client({
            region: config.S3.Region,
            credentials: {
                accessKeyId: config.AWS.AccessKeyID,
                secretAccessKey: config.AWS.SecretAccessKey
            }
        }), // Removed new S3({}) || 
          params: {
              Bucket: config.S3.Bucket,
              Key,
              Body
          },
      
          tags: [
            /*...*/
          ], // optional tags
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        });
      
        parallelUploads3.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });
      
        await parallelUploads3.done();
      } catch (e) {
        console.log(e);
      }
}

const main = async () => {
    await uploadFile('file.txt', "Foo bar")
}

main()