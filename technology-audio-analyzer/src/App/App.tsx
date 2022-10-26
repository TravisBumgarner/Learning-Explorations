import React, { useRef, useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'

type Analysers = {
  microphoneAnalyser: AnalyserNode
  displayAnalyser: AnalyserNode
  outputAnalyser: AnalyserNode
}

const DebugOverlayWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction:row;

  canvas {
    border: 1px solid black;
  }
`

const DebugOverlay = ({ microphoneAnalyser, displayAnalyser, outputAnalyser }: Analysers) => {
  const [counter, setCounter] = React.useState<number>(0)

  const microphoneRef = useRef<HTMLCanvasElement>(null)
  const displayRef = useRef<HTMLCanvasElement>(null)
  const outputRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 33)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!microphoneRef.current || !displayRef.current || !outputRef.current) {
      alert('oh no')
      return
    }
    const microphoneCanvas = microphoneRef.current
    const microphoneContext = microphoneCanvas.getContext('2d')

    const displayCanvas = displayRef.current
    const displayContext = displayCanvas.getContext('2d')

    const outputCanvas = outputRef.current
    const outputContext = outputCanvas.getContext('2d')

    if (!microphoneContext || !displayContext || !outputContext) {
      alert('hmm')
      return
    }

    const microphoneBufferLength = microphoneAnalyser.frequencyBinCount
    const microphoneDataArray = new Uint8Array(microphoneBufferLength)
    microphoneAnalyser.getByteFrequencyData(microphoneDataArray)

    const microphoneWidth = microphoneCanvas.width
    const microphoneHeight = microphoneCanvas.height
    const microphoneBarWidth = microphoneWidth / microphoneBufferLength

    microphoneContext.clearRect(0, 0, microphoneWidth, microphoneHeight)

    microphoneDataArray.forEach((item, index) => {
      const y = item / 255 * microphoneHeight / 2
      const x = microphoneBarWidth * index

      microphoneContext.fillStyle = `LightPink`
      microphoneContext.fillRect(x, microphoneHeight - y, microphoneBarWidth, y)
    })


    const displayBufferLength = displayAnalyser.frequencyBinCount
    const displayDataArray = new Uint8Array(displayBufferLength)
    displayAnalyser.getByteFrequencyData(displayDataArray)

    const displayWidth = displayCanvas.width
    const displayHeight = displayCanvas.height
    const displayBarWidth = displayWidth / displayBufferLength

    displayContext.clearRect(0, 0, displayWidth, displayHeight)

    displayDataArray.forEach((item, index) => {
      const y = item / 255 * displayHeight / 2
      const x = displayBarWidth * index

      displayContext.fillStyle = `LightPink`
      displayContext.fillRect(x, displayHeight - y, displayBarWidth, y)
    })


    const outputBufferLength = outputAnalyser.frequencyBinCount
    const outputDataArray = new Uint8Array(outputBufferLength)
    outputAnalyser.getByteFrequencyData(outputDataArray)

    const outputWidth = outputCanvas.width
    const outputHeight = outputCanvas.height
    const outputBarWidth = outputWidth / outputBufferLength

    outputContext.clearRect(0, 0, outputWidth, outputHeight)

    outputDataArray.forEach((item, index) => {
      const y = item / 255 * outputHeight / 2
      const x = outputBarWidth * index

      outputContext.fillStyle = `LightPink`
      outputContext.fillRect(x, outputHeight - y, outputBarWidth, y)
    })
  }, [counter])

  return (
    <DebugOverlayWrapper>
      <div>
        <h1>Microphone</h1>
        <canvas ref={microphoneRef} />
      </div>
      <div>
        <h1>Display</h1>
        <canvas ref={displayRef} />
      </div>
      <div>
        <h1>Output</h1>
        <canvas ref={outputRef} />
      </div>
    </DebugOverlayWrapper>
  )
}


const App = () => {
  const audioContext = useRef<AudioContext | null>()
  const mediaStream = useRef<MediaStream | null>()
  const [analyserNodes, setAnalysisNodes] = useState<Analysers | null>(null)
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

      const mergedAudioStreamDestinationNode = audioContext.current.createMediaStreamDestination();

      const displayAudio = audioContext.current.createMediaStreamSource(microphoneStream);
      const displayAnalyser = new AnalyserNode(audioContext.current, { fftSize: 256 })
      displayAudio
        .connect(displayAnalyser)
        .connect(mergedAudioStreamDestinationNode);

      const userAudio = audioContext.current.createMediaStreamSource(userStream);
      gainNode.current = new GainNode(audioContext.current, { gain: isMuted ? 0 : 0.5 });
      const microphoneAnalyser = new AnalyserNode(audioContext.current, { fftSize: 256 })
      userAudio
        .connect(gainNode.current)
        .connect(microphoneAnalyser)
        .connect(mergedAudioStreamDestinationNode);

      const mergedAudioTrack = mergedAudioStreamDestinationNode.stream.getAudioTracks()[0];
      const mergedAudioStream = new MediaStream([mergedAudioTrack]);

      const toMonitor = audioContext.current.createMediaStreamSource(mergedAudioStream)
      const outputAnalyser = new AnalyserNode(audioContext.current, { fftSize: 256 })
      toMonitor
        .connect(outputAnalyser)

      setAnalysisNodes({
        'microphoneAnalyser': microphoneAnalyser,
        "displayAnalyser": displayAnalyser,
        "outputAnalyser": outputAnalyser
      })

      return mergedAudioStream
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
      {analyserNodes && <DebugOverlay
        displayAnalyser={analyserNodes.displayAnalyser}
        microphoneAnalyser={analyserNodes.microphoneAnalyser}
        outputAnalyser={analyserNodes.outputAnalyser}
      />}
    </div>
  )
}

export default App
