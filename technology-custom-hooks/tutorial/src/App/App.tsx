import * as React from 'react'

import { Body, Title } from 'sharedComponents'
import {useLocalStorage, useMediaRecorder} from './customHooks'

const App = () => {
  const [name, setName] = useLocalStorage('name', '')

  const onstop = () => {
    console.log('recording stopped')
  }

  const ondataavailable = () => {
    console.log('data received')
  }

  const {startRecording, stopRecording } = useMediaRecorder({onstop, ondataavailable})
  return (
    <Body>
      <Title>Hello {name}!</Title>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      
    </Body>
  )
}

export default App
