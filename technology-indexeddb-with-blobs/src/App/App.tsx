import React, { FormEvent, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'

import { Body, Title } from 'sharedComponents'
import database from 'database'

const Image = ({blob}: {blob: Blob}) => {
  const urlSrc = URL.createObjectURL(blob)
  return <img src={urlSrc}/>
}

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const images = useLiveQuery(() => database.images.toArray())

  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    database.images.add({
      id: uuidv4(),
      file: selectedFile,
      name: selectedFileName,
      uploadedToS3: false
    }).then(() => {
      setSelectedFile(null)
      setSelectedFileName('')
    })
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <Title>Hello World!</Title>
        <input type="file" name="file" onChange={(event) => setSelectedFile(event.target.files[0])} />
        <input type="text" value={selectedFileName} name="fileName" onChange={(event) => setSelectedFileName(event.target.value)} />
        <button type="submit">Submit</button>

      </form>
      <div>
        <Title>Uploads</Title>
        <ul>
          {images ? images.map(({ id, name, file }) => <li><Image blob={file}/></li>) : "loading"}
        </ul>

      </div>
    </>
  )
}

export default App
