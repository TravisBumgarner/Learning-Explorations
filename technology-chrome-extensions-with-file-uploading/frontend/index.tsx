import * as React from 'react'
import { createRoot } from 'react-dom/client';


const App = () => {
  const handleClick = () => {
    console.log("App.tsx click")
  }
  return (
      <button onClick={handleClick} id="super-awesome-button">Click Me!</button>
  )
}

export default App


const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(<App/>);