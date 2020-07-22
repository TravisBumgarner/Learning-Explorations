import React from 'react'
import ReactDOM from 'react-dom'

import MyComponent from './MyComponent'

const App = () => {
    return <div><MyComponent text="TypeScript without babel" /></div>
}

ReactDOM.render(<App />, document.getElementById("root"))