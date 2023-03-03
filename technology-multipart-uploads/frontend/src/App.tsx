import Axios from 'axios'
import { useCallback } from 'react'

interface Part {
  ETag: string
  PartNumber: number
}

const FILE_CHUNK_SIZE = 10_000_000

async function uploadParts(blob: Blob, urls: Record<number, string>) {
  const axios = Axios.create()
  delete axios.defaults.headers.put['Content-Type']

  const keys = Object.keys(urls)
  const promises = []

  for (const indexStr of keys) {
    const index = parseInt(indexStr)
    const start = index * FILE_CHUNK_SIZE
    const end = (index + 1) * FILE_CHUNK_SIZE
    const part = index < keys.length
      ? blob.slice(start, end)
      : blob.slice(start)
    console.log(urls)
    promises.push(axios.put(urls[index], blob))
  }

  const resParts = await Promise.all(promises)

  return resParts.map((part, index) => ({
    ETag: (part as any).headers.etag,
    PartNumber: index + 1
  }))
}

// Faking idea of data with these functions. Basically generate X mb of data of a single char. Merge server side into a text file.
const fiveMBofData = (char: string) => {
  const blob = new Blob([char.repeat(10 * 1024 * 1024)])
  console.log('blob is of mb size:', blob.size / 1024 / 1024)
  return blob
}

const fakeDataFetch = () => {
  return 'ab'
}

const App = () => {
  const upload = useCallback(async () => {
    const parts = [
      fiveMBofData('a'),
      fiveMBofData('b')
    ]
    const { data: { urls } } = await Axios.post('http://localhost:5001/presignedurl', { parts: parts.length })
    const blob = new Blob(parts)
    uploadParts(blob, urls as unknown as Record<number, string>)
  }, [])

  return (
    <div>
      Hello World.
      <button onClick={upload}>Submit</button>
    </div>
  )
}

export default App
