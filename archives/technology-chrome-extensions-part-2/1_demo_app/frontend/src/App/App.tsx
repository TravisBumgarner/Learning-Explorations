import * as React from 'react'

import { Body, Title } from 'sharedComponents'
import {
  Message
} from '../../../shared/types'
const APP_ID = 'nbecpaagioopanohpffloepbgikoacej'

const App = () => {
  const startRecording = () => {

    if (!chrome) {
      alert("you need chrome :(")
      return
    }

    const message: Message = {
      type: "START_RECORDING"
    }

    chrome.runtime.sendMessage(APP_ID, message,
      function (response) {
        console.log('response', response);
      });
  }

  const stopRecording = () => {
    if (!chrome) {
      alert("you need chrome :(")
      return
    }

    const message: Message = {
      type: "STOP_RECORDING"
    }

    chrome.runtime.sendMessage(APP_ID, message,
      function (response) {
        console.log('response', response);
      });
  }

  return (
    <Body>
      <Title>Hello World!</Title>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
    </Body>
  )
}

export default App
