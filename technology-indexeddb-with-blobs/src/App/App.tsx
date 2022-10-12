import React, { FormEvent, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'

import useMediaRecorder, { StatusMessages } from './useMediaRecorder'
import { Body, Title } from 'sharedComponents'
import database from 'database'

const Video = ({ blob }: { blob: Blob }) => {
  const urlSrc = URL.createObjectURL(blob)
  return <video src={urlSrc} />
}

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const onStart = () => { }
  const onError = () => { }

  const videos = useLiveQuery(() => database.videos.toArray())

  const onStop = (blob: Blob) => {
    const id = uuidv4()
    database.videos.add({
      id,
      file: blob,
      name: `video-${id}.webm`,
      uploadedToS3: false
    }).then(() => {
      setSelectedFile(null)
      setSelectedFileName('')
    })
  };

  const { startRecording, stopRecording, status } = useMediaRecorder({ onStart, onStop, onError })

  return (
    <>
      <div>
        <Title>Record a Video</Title>
        <button disabled={status !== StatusMessages.Idle} onClick={startRecording}>Start Recording</button>
        <button disabled={status !== StatusMessages.Recording} onClick={stopRecording}>Stop Recording</button>
        <p>Status - {status}</p>
      </div>
      <div>
        <Title>Uploads</Title>
        <ul>
          {videos ? videos.map(({ id, name, file }) => {
            const url = URL.createObjectURL(file)
            return (
              <li><a download={name} href={url}>Download - {name}</a></li>
            )
          }) : "loading"}
        </ul>
      </div>
    </>
  )
}

export default App
