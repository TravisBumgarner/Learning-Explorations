import React from 'react';
import logo from './logo.svg';
import './App.css';
import { pdfjs } from 'react-pdf';

import PDF from './PDF'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  return (
    <div className="App">
      <PDF />
    </div>
  );
}

export default App;
