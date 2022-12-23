import * as React from 'react'
import styled from 'styled-components'

import { Body, Title } from 'sharedComponents'
import Navigation from './Navigation'
import Router from './Router'
import { GlobalStyle } from 'theme'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Body>
        <Navigation />
        <Router />
      </Body>
    </>
  )
}

export default App
