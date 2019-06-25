import React from 'react';

function foo(a: string): string; 
function foo(a: number): string; 
function foo(a: any){
  if(typeof a === 'string') return 'String!'
  else if(typeof a === 'object') return 'Object!'
  else return "I should never happen."
}

const App: React.FC = () => {
  foo('a')
  foo(false)
  return (
    <p>Hi.</p>
  )

}

export default App;
