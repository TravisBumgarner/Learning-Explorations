import React from 'react';
import Current from './Current';
import styled from 'styled-components';

interface AppProps {
  numComponents: number;
  pdfPath: string;
}

const App: React.FC<AppProps> = ({ numComponents, pdfPath }) => {
  const components = Array.from({ length: numComponents }, (_, i) => (
    <Current pdfPath={pdfPath} key={i} />
  ));

  return <>
    <h1>Current</h1>
    <Wrapper>{components}
    </Wrapper>
  </>
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`


export default App;