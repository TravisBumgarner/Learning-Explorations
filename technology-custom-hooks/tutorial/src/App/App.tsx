import * as React from 'react'
import {useReactMediaRecorder} from 'react-media-recorder'

import { Body, Title } from 'sharedComponents'

const App = () => {

  const onStop = () => {
    console.log('recording stopped')
  }

  const ondataavailable = () => {
    console.log('data received')
  }

  const {startRecording, stopRecording } = useReactMediaRecorder({onStop})
  return (
    <Body>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>

    </Body>
  )
}

export default App
