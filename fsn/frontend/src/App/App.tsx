import { EventObject } from 'xstate'
import styled from 'styled-components'
import * as React from 'react'

import { Body, Title, Text } from 'sharedComponents'

type EventId = "PLAY" | "STOP" | "FORWARD" | "REWIND"
const POSSIBLE_EVENTS: EventId[] = ["PLAY", "STOP", "FORWARD", "REWIND"]


const Button = styled.button`
  border-radius: 0;
  border: lightpink inset 5px;
  color: lightpink;
  background-color: lightslategray;
  padding: 5px;
  margin: 5px;
  width: 150px;

  ${({ isActive }: { isActive: boolean }) => isActive
    ? `
        border-color: turquoise;
        color: turquoise;
      `
    : `
         cursor: pointer;
    `}
`

let intervalID: null | NodeJS.Timeout

const App = () => {
  const [currentTime, setCurentTime] = React.useState<number>(0)
  const [currentState, setCurentState] = React.useState<EventId>("STOP")
  const [duration, setDuration] = React.useState<number>(360)

  const buttons = POSSIBLE_EVENTS.map(pe => <Button onClick={() => setCurentState(pe)} isActive={currentState === pe}>{pe}</Button>)

  React.useEffect(() => {
    switch (currentState) {
      case "PLAY":
        clearInterval(intervalID)
        intervalID = setInterval(() => setCurentTime(prevTime => prevTime + 1), 1000)
        break
      case "REWIND":
        clearInterval(intervalID)
        intervalID = setInterval(() => setCurentTime(prevTime => prevTime - 5), 1000)
        break
      case "STOP":
        clearInterval(intervalID)
        break
      case "FORWARD":
        clearInterval(intervalID)
        intervalID = setInterval(() => setCurentTime(prevTime => prevTime + 5), 1000)
        break
    }
  }, [currentState])

  return (
    <Body>
      <Title>Tape Player!</Title>
      <div>
        {buttons}
      </div>
      <div>
        <Text>Current Time: {currentTime}</Text>
        <Text>Duration: {duration}</Text>
      </div>
    </Body>
  )
}

export default App
