import React from 'react';
import Current from './Current';

interface AppProps {
  numComponents: number;
  pdfPath: string;
}

const App: React.FC<AppProps> = ({ numComponents, pdfPath }) => {
  const components = Array.from({ length: numComponents }, (_, i) => (
    <Current pdfPath={pdfPath} key={i} />
  ));

  return <>
    <h1>Current</h1>{components}</>;
};

export default App;