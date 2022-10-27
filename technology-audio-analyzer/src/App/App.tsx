import React, { useRef, useCallback, useState, useEffect, Key } from 'react'
import styled from 'styled-components'

const listify = (obj: Object) => <ul>{Object.entries(obj)
  .filter(([key]) => !(['groupId', 'deviceId'].includes(key)))
  .map(([key, value]) => <li>{key} - {`${value}`}</li>)}</ul>

enum Keys {
  microphone = 'microphone',
  display = 'display',
  output = 'output',
}

type AudioStreamDetails = {
  analysers: Record<Keys, AnalyserNode>
  settings: Record<Key, MediaTrackSettings>
  capabilities: Record<Key, MediaTrackCapabilities>
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

const DebugOverlay = ({ analysers, settings, capabilities }: AudioStreamDetails) => {
  const [counter, setCounter] = React.useState<number>(0)
  console.log(capabilities)

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

    const microphoneBufferLength = analysers.microphone.frequencyBinCount
    const microphoneDataArray = new Uint8Array(microphoneBufferLength)
    analysers.microphone.getByteFrequencyData(microphoneDataArray)

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


    const displayBufferLength = analysers.display.frequencyBinCount
    const displayDataArray = new Uint8Array(displayBufferLength)
    analysers.display.getByteFrequencyData(displayDataArray)

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


    const outputBufferLength = analysers.output.frequencyBinCount
    const outputDataArray = new Uint8Array(outputBufferLength)
    analysers.output.getByteFrequencyData(outputDataArray)

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
        <div>
          {listify(settings.microphone)}
        </div>
      </div>
      <div>
        <h1>Display</h1>
        <canvas ref={displayRef} />
        <div>
          {listify(settings.display)}
        </div>
      </div>
      <div>
        <h1>Output</h1>
        <canvas ref={outputRef} />
        <div>
          {listify(settings.output)}
        </div>
      </div>
    </DebugOverlayWrapper>
  )
}


const App = () => {
  const audioContext = useRef<AudioContext | null>()
  const mediaStream = useRef<MediaStream | null>()
  const [audioStreamDetails, setAudioStreamDetails] = useState<AudioStreamDetails | null>(null)
  const gainNode = useRef<GainNode | null>()
  const [isMuted, setIsMuted] = useState<boolean>(false)

  useEffect(() => {
    if (gainNode.current && audioContext.current) {
      gainNode.current.gain.setTargetAtTime(isMuted ? 0 : 0.5, audioContext.current.currentTime, .01)
    }
  }, [isMuted])

  const mergeAudioStreams = useCallback(
    async (userStream: MediaStream, displayStream: MediaStream) => {
      audioContext.current = new AudioContext();

      const mergedAudioStreamDestinationNode = audioContext.current.createMediaStreamDestination();

      const displayAudio = audioContext.current.createMediaStreamSource(displayStream);
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

      setAudioStreamDetails(prev => ({
        ...prev,
        analysers: { microphone: microphoneAnalyser, display: displayAnalyser, output: outputAnalyser },
        settings: {
          microphone: userStream.getAudioTracks()[0].getSettings(),
          display: displayStream.getAudioTracks()[0].getSettings(),
          output: mergedAudioStream.getAudioTracks()[0].getSettings()
        },
        capabilities: {
          microphone: userStream.getAudioTracks()[0].getCapabilities(),
          display: displayStream.getAudioTracks()[0].getCapabilities(),
          output: mergedAudioStream.getAudioTracks()[0].getCapabilities()
        }
      }))

      return mergedAudioStream
    },
    [isMuted],
  );

  const getMediaStream = useCallback(async () => {
    const userStream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
    const displayStream = await window.navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });

    const audioStream = await mergeAudioStreams(userStream, displayStream);

    mediaStream.current = new MediaStream([...audioStream.getAudioTracks(), ...displayStream.getVideoTracks()]);
  }, [mergeAudioStreams]);

  const startRecording = useCallback(async () => {
    if (!mediaStream.current) await getMediaStream();
  }, [getMediaStream]);

  const [debugMode, setDebugMode] = useState<boolean>(false)

  useEffect(() => {
    const updateDebugMode = (event: KeyboardEvent) => {
      if (event.code === "AltLeft") {
        setDebugMode(prev => !prev)
      }
    }

    window.addEventListener('keydown', updateDebugMode)
    return () => window.removeEventListener('keydown', updateDebugMode)
  }, [])

  return (
    <div>
      <button>{debugMode ? "go go" : "gogoo and debug"}</button>
      <button onClick={startRecording}>Record</button>
      <button onClick={() => setIsMuted(prev => !prev)}>Mute</button>
      <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
      </iframe>
      {audioStreamDetails && <DebugOverlay
        analysers={audioStreamDetails.analysers}
        settings={audioStreamDetails.settings}
        capabilities={audioStreamDetails.capabilities}

      />}
    </div>
  )
}

export default App
