import * as React from 'react'
import styled from 'styled-components'

import { Body, Title } from 'sharedComponents'
import Navigation from './Navigation'
import Router from './Router'


const App = () => {
  return (
    <Body>
      <Navigation />
      <Router />
    </Body>
  )
}

export default App
