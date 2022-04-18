import * as React from 'react'
import { HashRouter } from 'react-router-dom'

import { GlobalStyle } from 'theme'
import { Header, Routes } from './components'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Header />
        <Routes />
      </HashRouter>
    </>
  )
}

export default App
