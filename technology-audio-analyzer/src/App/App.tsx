import React, { useRef, useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'

type DebugOverlayProps = {
  analyserNodes: Record<string, AnalyserNode>
}

const DebugOverlayWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
`

const DebugOverlay = ({ analyserNodes }: DebugOverlayProps) => {
  const [counter, setCounter] = React.useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 33)

    return () => clearInterval(intervalId)
  }, [])

 

  return (
    <DebugOverlayWrapper>
      {
        analyserNodes ? (Object.keys(analyserNodes).map(key => {
          const node = analyserNodes[key]
          const bufferLength = node.frequencyBinCount
          const dataArray = new Uint8Array(bufferLength)
          node.getByteFrequencyData(dataArray)

          return (
            <div key={key}>{dataArray}</div>
          )
        }))
          : <div>No nodes.</div>
      }
    </DebugOverlayWrapper>
  )
}


const App = () => {
  const audioContext = useRef<AudioContext | null>()
  const mediaStream = useRef<MediaStream | null>()
  const [analyserNodes, setAnalysisNodes] = useState<Record<string, AnalyserNode>>({})
  const gainNode = useRef<GainNode | null>()
  const [isMuted, setIsMuted] = useState<boolean>(false)

  useEffect(() => {
    if (gainNode.current && audioContext.current) {
      gainNode.current.gain.setTargetAtTime(isMuted ? 0 : 0.5, audioContext.current.currentTime, .01)
    }
  }, [isMuted])

  const mergeAudioStreams = useCallback(
    async (userStream: MediaStream, microphoneStream: MediaStream) => {
      audioContext.current = new AudioContext();

      const mergedAudioStream = audioContext.current.createMediaStreamDestination();

      const displayAudio = audioContext.current.createMediaStreamSource(microphoneStream);
      const displayAudioAnalyserNode = new AnalyserNode(audioContext.current, { fftSize: 256 })
      displayAudio
        .connect(displayAudioAnalyserNode)
        .connect(mergedAudioStream);

      const userAudio = audioContext.current.createMediaStreamSource(userStream);
      gainNode.current = new GainNode(audioContext.current, { gain: isMuted ? 0 : 0.5 });
      const userAudioAnalyserNode = new AnalyserNode(audioContext.current, { fftSize: 256 })
      userAudio
        .connect(gainNode.current)
        .connect(userAudioAnalyserNode)
        .connect(mergedAudioStream);

      setAnalysisNodes({
        'userAudioAnalyserNode': userAudioAnalyserNode,
        "displayAudioAnalyserNode": displayAudioAnalyserNode
      })


      // const mergedAudioAnalyserNode = new AnalyserNode(audioContext.current, { fftSize: 256 })
      // analyserNodes.current['mergedAudioAnalyserNode'] = mergedAudioAnalyserNode
      // mergedAudioStream
      //   .connect(mergedAudioAnalyserNode)

      const mergedAudioTrack = mergedAudioStream.stream.getAudioTracks()[0];
      return new MediaStream([mergedAudioTrack]);
    },
    [isMuted],
  );

  const getMediaStream = useCallback(async () => {
    const userStream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
    const microphoneStream = await window.navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });

    const audioStream = await mergeAudioStreams(userStream, microphoneStream);

    mediaStream.current = new MediaStream([...audioStream.getAudioTracks(), ...microphoneStream.getVideoTracks()]);
  }, [mergeAudioStreams]);

  const startRecording = useCallback(async () => {
    if (!mediaStream.current) await getMediaStream();
  }, [getMediaStream]);

  return (
    <div>
      <button onClick={startRecording}>Record</button>
      <button onClick={() => setIsMuted(prev => !prev)}>Mute</button>
      <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
      </iframe>
      <DebugOverlay analyserNodes={analyserNodes} />
    </div>
  )
}

export default App
