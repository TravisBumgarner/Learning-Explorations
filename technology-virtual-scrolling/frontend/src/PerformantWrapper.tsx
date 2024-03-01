import React from 'react';
import Performant from './Performant';
import { pdfjs } from 'react-pdf';

interface AppProps {
  numComponents: number;
  pdfPath: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const App: React.FC<AppProps> = ({ numComponents, pdfPath }) => {
  const components = Array.from({ length: numComponents }, (_, i) => (
    <Performant pdfPath={pdfPath} key={i} />
  ));

  return <>
  <h1>Performant</h1>
  {components}
  </>;
};

export default App;