import React, { useContext, useEffect, createContext } from 'react';

const MyContext = createContext({
  name: 'Travis', 
  age: 28
})

const App = () => {
  const context = useContext(MyContext)
  return <div><span>My age is {context.age}</span><button onClick={context.incrementAge}>++ Age</button></div>
}

export default App;
