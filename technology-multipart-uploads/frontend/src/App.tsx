import Axios from 'axios'
import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface AWSPart {
  ETag: string
  PartNumber: number
}


async function uploadPartToAWS(blob: Blob, index: number, url: string): Promise<AWSPart> {
  const axios = Axios.create()
  delete axios.defaults.headers.put['Content-Type']

  const result = await axios.put(url, blob)
  return {
    ETag: result.headers.etag, // needs to be exposed by CORS in S3.
    PartNumber: index + 1 // Part numbers start at 1.
  }
}

// Faking idea of data with these functions. Basically generate X mb of data of a single char. Merge server side into a text file.
const fiveMBofData = (char: string) => {
  const blob = new Blob([char.repeat(5.02 * 1024 * 1024)])
  console.log('blob is of mb size:', blob.size / 1024 / 1024)
  return blob
}

const fakeDataStreaming = function* () {
  yield { blob: fiveMBofData('a'), index: 0 };
  yield { blob: fiveMBofData('b'), index: 1 };
  yield { blob: fiveMBofData('c'), index: 2 };
};

interface Part {
  ETag: string
  PartNumber: number
}

const App = () => {
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [s3Key] = useState<string>(uuidv4())

  const initateUpload = useCallback(async () => {
    const { data: { uploadId } } = await Axios.post('http://localhost:5001/initiate_multipart_upload', { s3Key })
    setUploadId(uploadId)
  }, [s3Key])

  const upload = useCallback(async () => {
    const uploadParts: Part[] = []
    for (const { index, blob } of fakeDataStreaming()) {
      const { data: { url } } = await Axios.post('http://localhost:5001/generate_presigned_url', { index, uploadId, s3Key })
      uploadParts.push(await uploadPartToAWS(blob, index, url))
    }

    const uploadedParts = await Promise.all(uploadParts)
    console.log('uploadedParts', uploadedParts)
    await Axios.post('http://localhost:5001/merge_parts', { uploadedParts, uploadId, s3Key })
  }, [uploadId, s3Key])

  return (
    <div>
      <p>Your Recording ID is {uploadId}</p>
      <button onClick={initateUpload}>Initiate</button>
      <button onClick={upload}>Upload</button>
    </div>
  )
}

export default App
