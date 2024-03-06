import React, { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import styled from 'styled-components';
import PerformantWrapper from './PerformantWrapper'
import PerformantWrapper2 from './Performant2Wrapper'
import CurrentWrapper from './CurrentWrapper'
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const App = () => {
  const [pdfPath, setPdfPath] = useState<string>('http://localhost:8080/static/frommarla.pdf');
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const copies = searchParams.get('copies');
  console.log(copies)
  const [numComponents, setNumComponents] = useState<number>(parseInt(copies || '1', 10));

  return (
    <div className="App">
      <nav>
        <ul style={{textAlign: 'left'}}>
          <li>
            <a href="/infinitescroll">Infinite Scroll</a>
          </li>
          <li>
            <a href="/current">Current</a> - No optimizations
          </li>
          <li>
            <a href="/performant">Performant</a> - Only load the current page +/- 2
          </li>
          <li>
            <a href="/performant2">Performant 2</a> - Only load the current page (Optimizing for page load)
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
        <Route
          path="/performant2"
          element={<PerformantWrapper2 numComponents={numComponents} pdfPath={pdfPath} />}
        />
      </Routes>
    </div>
  )
}

const Input = styled.input`
  width: 500px;
`

export default App;