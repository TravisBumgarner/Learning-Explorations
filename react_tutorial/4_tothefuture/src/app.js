import React from 'react'
import ReactDOM from 'react-dom'

import Foo from './Foo'

const App = () => {
    return (
        <div>
            <Foo />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))