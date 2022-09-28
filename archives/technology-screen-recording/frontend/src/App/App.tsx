import * as React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router'
import { BrowserRouter, NavLink } from 'react-router-dom'

import VideoList from './VideoList'
import Workspace from './Workspace'
import Context from './Context'

const App = () => {
  return (
      <Context>
    <BrowserRouter>
        <ul>
          <li><NavLink to="/">Workspace</NavLink></li>
          <li><NavLink to="/videolist">Video List</NavLink></li>
        </ul>
        <Routes>
          <Route
            path="/"
            element={<Workspace />}
          />
          <Route
            path="/videolist"
            element={<VideoList/>}
          />
        </Routes>
    </BrowserRouter>
      </Context>
  )
}

export default App
