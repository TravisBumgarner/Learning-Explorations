import React from 'react'
import ReactDOM from 'react-dom'

import MyComponent from './MyComponent'

const App = () => {
    return <div><MyComponent text="TypeScript" /></div>
}

ReactDOM.render(<App />, document.getElementById("root"))