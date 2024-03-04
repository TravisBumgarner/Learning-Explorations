import React from 'react';
import Performant from './Performant';
import { pdfjs } from 'react-pdf';
import styled from 'styled-components';

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
    <Wrapper>
      {components}
    </Wrapper>
  </>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default App;