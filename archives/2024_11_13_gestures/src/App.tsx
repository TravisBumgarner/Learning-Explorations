import React, { useState } from 'react';
import './App.css';
import Canvas from './Canvas';
import Gestures from './Gestures';

enum Page {
  Home,
  Canvas,
  Gestures
}

function App() {
  const [activePage, setActivePage] = useState(Page.Gestures);


  return (
    <>
        <button onClick={() => setActivePage(Page.Canvas)}>Canvas</button>
        <button onClick={() => setActivePage(Page.Gestures)}>Gestures</button>
        {activePage === Page.Canvas && <Canvas />}
        {activePage === Page.Gestures && <Gestures />}
    </>
  )
}

export default App;
