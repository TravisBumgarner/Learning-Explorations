import * as React from 'react'
import styled from 'styled-components'
import axios from 'axios'


import { Body, Title } from 'sharedComponents'
import { ColorCounts } from '../../../sharedTypes'

const Button = styled.button`
  ${({ color }) => `
    color: ${color};
`}`

const DEFAULT_COLOR_COUNTS = {
  red: 0,
  green: 0,
  blue: 0
}

const App = () => {
  const [counts, setCounts] = React.useState<ColorCounts>(DEFAULT_COLOR_COUNTS)

  React.useEffect(() => {
    axios.get('http://localhost:5001/buttons')
      .then(({ data }: { data: ColorCounts }) => setCounts(data))
  }, [])

  const handleButtonClick = (color: keyof ColorCounts) => {
    axios.post(`http://localhost:5001/button-press/${color}`)
  }

  const Counts = Object.keys(counts).map((color: keyof ColorCounts) => <li>{color} - {counts[color]}</li>)
  return (
    <Body>
      <div>
        <Title>Click Buttons with Kafka</Title>
        <p>Refresh to get current button count.</p>
        <Button onClick={() => handleButtonClick('red')} color="red">Red</Button>
        <Button onClick={() => handleButtonClick('green')} color="green">Green</Button>
        <Button onClick={() => handleButtonClick('blue')} color="blue">Blue</Button>
        <p>Click counts</p>
        <ul>
          {Counts}
        </ul>
      </div>
    </Body>
  )
}

export default App
