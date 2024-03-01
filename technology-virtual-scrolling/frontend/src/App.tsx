import React, { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import styled from 'styled-components';
import PerformantWrapper from './PerformantWrapper'
import CurrentWrapper from './CurrentWrapper'
import { Route, Routes } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

const App = () => {
  const [pdfPath, setPdfPath] = useState<string>('http://localhost:8080/static/bigfile100.pdf');
  const [numComponents, setNumComponents] = useState<number>(1);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/infinitescroll">Infinite Scroll</a>
          </li>
          <li>
            <a href="/current">Current</a>
          </li>
          <li>
            <a href="/performant">Performant</a>
          </li>
        </ul>
        </nav>

      <label>PDF File</label>
      <Input width={500} type="text" value={pdfPath} onChange={(e) => setPdfPath(e.target.value)} /><br />
      <label>Number of Rendered PDFs</label>
      <Input width={500} type="number" value={numComponents} onChange={(e) => setNumComponents(parseInt(e.target.value))} /><br />

      <Routes>
        <Route
          path="/infinitescroll"
          element={<InfiniteScroll  />}
        />
        <Route
          path="/current"
          element={<CurrentWrapper numComponents={numComponents} pdfPath={pdfPath}  />}
        />
        <Route
          path="/performant"
          element={<PerformantWrapper numComponents={numComponents} pdfPath={pdfPath} />}
        />
      </Routes>
    </div>
  )
}

const Input = styled.input`
  width: 500px;
`

export default App;