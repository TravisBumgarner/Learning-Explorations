import React, { useState } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Current from './Current';
import Performant from './Performant';

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('Component1');

  const renderComponent = () => {
    switch(selectedComponent) {
      case 'InfiniteScroll':
        return <InfiniteScroll />;
      case 'Current':
        return <Current />;
      case 'Performant':
        return <Performant />;
    }
  }

  return (
    <div className="App">
      <button onClick={() => setSelectedComponent('InfiniteScroll')}>Infinite Scroll</button>
      <button onClick={() => setSelectedComponent('Current')}>Current</button>
      <button onClick={() => setSelectedComponent('Performant')}>Performant</button>
      {renderComponent()}
    </div>
  )
}

export default App;