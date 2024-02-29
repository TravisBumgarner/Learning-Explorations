import React, { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Current from './Current';
import Performant from './Performant';
import styled from 'styled-components';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('Component1');
  const [pdfPath, setPdfPath] = useState<string>('http://localhost:8080/static/edited.pdf');

  const renderComponent = () => {
    switch(selectedComponent) {
      case 'InfiniteScroll':
        return <InfiniteScroll />;
      case 'Current':
        return <Current pdfPath={pdfPath} />;
      case 'Performant':
        return <Performant pdfPath={pdfPath} />;
    }
  }

  return (
    <div className="App">
      <Input width={500} type="text" value={pdfPath} onChange={(e) => setPdfPath(e.target.value)} /><br />
      <button onClick={() => setSelectedComponent('InfiniteScroll')}>Infinite Scroll</button>
      <button onClick={() => setSelectedComponent('Current')}>Current</button>
      <button onClick={() => setSelectedComponent('Performant')}>Performant</button>
      {renderComponent()}
    </div>
  )
}

const Input = styled.input`
  width: 500px;
`

export default App;