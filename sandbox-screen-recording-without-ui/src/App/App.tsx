import React, { useRef, useEffect, useCallback } from 'react'

import { Body, Title } from 'sharedComponents'

const YoutubeEmbed = () => (
  <div className="video-responsive">
    <iframe
      width="500"
      height="480"
      src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

const App = () => {
  const mediaStream = useRef<MediaStream | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  
  const getMediaStream = useCallback(async () => {
    const displayStream = await window.navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });

    displayStream.getVideoTracks().forEach(track => {
      console.log('capabilities', track.getCapabilities())
      console.log('constraints', track.getConstraints())
      console.log('settings', track.getSettings())
    })

    mediaStream.current = displayStream
  }, [])

  const startRecording = useCallback(async () => {
    await getMediaStream()

    const data: Blob[] = []
    mediaRecorder.current = new MediaRecorder(mediaStream.current)
    
    mediaRecorder.current.ondataavailable = (event) => {
        data.push(event.data)
    }
    mediaRecorder.current.start()
    mediaRecorder.current.onstop = (event) => {
        const url = URL.createObjectURL(new Blob(data, {
            type: data[0].type
        }))
        console.log(url)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.webm');
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
    }
  }, [])

  const stopRecording = useCallback(() => {
    mediaRecorder.current.stop()
  }, [])
  

  return (
    <Body>
      <Title>Hello World!</Title>
      <button onClick={startRecording}>Record</button><button onClick={stopRecording}>Stop Recording</button>
      <YoutubeEmbed />
    </Body>
  )
}

export default App