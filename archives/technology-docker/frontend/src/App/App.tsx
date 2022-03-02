import axios from 'axios'
import * as React from 'react'

import { Body, Title } from 'sharedComponents'

const App = () => {
  console.log('changes')
  React.useEffect(() => {
    axios.get('http://localhost:5001').then(r => console.log(r))
  }, [])
  return (
    <Body>
      <Title>Hello World!</Title>
    </Body>
  )
}

export default App
