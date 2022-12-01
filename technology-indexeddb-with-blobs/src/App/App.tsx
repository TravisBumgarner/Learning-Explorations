import React, { useEffect, useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'

import useMediaRecorder, { StatusMessages } from './useMediaRecorder'
import { Body, Title } from 'sharedComponents'
import database from 'database'

const getColor = () => Math.floor(Math.random() * 255)

const Video = ({ blob }: { blob: Blob }) => {
  const urlSrc = URL.createObjectURL(blob)
  return <video src={urlSrc} />
}

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [counter, setCounter] = useState<number>(0)
  const [whatToRecord, setWhatToRecord] = useState<'screen' | 'canvas'>('screen')

  const onStart = () => { }
  const onError = () => { }

  const canvasRef = useRef<HTMLCanvasElement>()
  

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

  useEffect(() => {
    const canvasContext = canvasRef.current.getContext('2d');
    canvasContext.fillStyle = `rgba(${getColor()}, ${getColor()}, ${getColor()})`
    canvasContext.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }, [counter])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 250)

    return () => clearInterval(intervalId)
  }, [])

  const { startRecording, stopRecording, status } = useMediaRecorder({ onStart, onStop, onError })

  const toggleWhatToRecord = () => {
    setWhatToRecord(() => whatToRecord === 'canvas' ? 'screen' : 'canvas')
  }

  return (
    <>
      <div>
        <Title>Record a Video</Title>
        <button disabled={status !== StatusMessages.Idle} onClick={startRecording}>Start Recording</button>
        <button disabled={status !== StatusMessages.Recording} onClick={stopRecording}>Stop Recording</button>
        <button onClick={toggleWhatToRecord}>Toggle, Currently - {whatToRecord}</button>
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
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default App
