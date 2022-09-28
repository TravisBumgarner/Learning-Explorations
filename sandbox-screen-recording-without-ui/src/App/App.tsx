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
  const audioContext = useRef<AudioContext>(null)
  const mediaStream = useRef<MediaStream | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const getAudioContext = useCallback(async () => {
    audioContext.current = new AudioContext()
  }, [])
  
  const getMediaStream = useCallback(async () => {
    const displayStream = await window.navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    const userStream = await window.navigator.mediaDevices.getUserMedia({ audio: true });

    const displayAudio = audioContext.current.createMediaStreamSource(displayStream);
    const userAudio = audioContext.current.createMediaStreamSource(userStream);

    const mergedAudioStream = audioContext.current.createMediaStreamDestination()
    displayAudio.connect(mergedAudioStream)
    userAudio.connect(mergedAudioStream)

    mediaStream.current = new MediaStream([...mergedAudioStream.stream.getAudioTracks(), ...displayStream.getVideoTracks()]);
  }, [])

  const startRecording = useCallback(async () => {
    await getAudioContext()

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
      <p>Vivamus lobortis elit vitae quam luctus vestibulum. Fusce vel nulla purus. Praesent aliquam, augue quis malesuada cursus, arcu turpis scelerisque purus, id sagittis diam urna sed odio. Donec eleifend erat vitae porttitor pulvinar. Nulla vel fermentum nunc. Aenean facilisis odio sit amet dolor venenatis hendrerit. Mauris purus massa, malesuada sed mi a, aliquam ullamcorper justo. Sed ac nulla dui.</p>
      <YoutubeEmbed />
    </Body>
  )
}

export default App