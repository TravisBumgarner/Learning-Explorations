import * as React from 'react'

import { Body, Title } from 'sharedComponents'
import {useLocalStorage} from './customHooks'

const App = () => {
  const [name, setName] = useLocalStorage('name', '')
  return (
    <Body>
      <Title>Hello {name}!</Title>
      <input value={name} onChange={e => setName(e.target.value)}/>
    </Body>
  )
}

export default App
