import * as React from 'react'
import { HashRouter } from 'react-router-dom'

import { GlobalStyle } from 'theme'
import { Header, Routes } from './components'

const db = require('better-sqlite3')('db.sqlite');

const row = db.prepare('SELECT * FROM test').get();
console.log(row);

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
