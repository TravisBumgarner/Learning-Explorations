import Axios from 'axios'
import { useCallback, useState } from 'react'

interface Part {
  ETag: string
  PartNumber: number
}

// const FILE_CHUNK_SIZE = 10_000_000

async function uploadParts(blobs: Blob[], urls: Record<number, string>) {
  const axios = Axios.create()
  delete axios.defaults.headers.put['Content-Type']

  const keys = Object.keys(urls)
  const promises = []

  for (const indexStr of keys) {
    const index = parseInt(indexStr)
    // const start = index * FILE_CHUNK_SIZE
    // const end = (index + 1) * FILE_CHUNK_SIZE
    // const part = index < keys.length
    //   ? blob.slice(start, end)
    //   : blob.slice(start)
    // console.log(urls)
    // promises.push(axios.put(urls[index], blob))
    promises.push(axios.put(urls[index], blobs[index]))
  }

  const resParts = await Promise.all(promises)
  return resParts.map((part, index) => {
    console.log(part)
    console.log(part.headers)
    return {
      ETag: (part as any).headers.etag,
      PartNumber: index + 1
    }
  })
}

// Faking idea of data with these functions. Basically generate X mb of data of a single char. Merge server side into a text file.
const fiveMBofData = (char: string) => {
  const blob = new Blob([char.repeat(5.02 * 1024 * 1024)])
  console.log('blob is of mb size:', blob.size / 1024 / 1024)
  return blob
}

const App = () => {
  const upload = useCallback(async () => {
    const parts = [
      fiveMBofData('a'),
      // fiveMBofData('b')
    ]
    const { data: { urls, uploadId } } = await Axios.post('http://localhost:5001/generatepresignedurl', { parts: parts.length })
    console.log('upload id', uploadId)
    const uploadedParts = await uploadParts(parts, urls as unknown as Record<number, string>)

    console.log(uploadedParts, uploadId)

    await Axios.post('http://localhost:5001/mergeparts', { uploadedParts, uploadId })
  }, [])

  return (
    <div>
      Hello World.
      <button onClick={upload}>Submit</button>
    </div>
  )
}

export default App
