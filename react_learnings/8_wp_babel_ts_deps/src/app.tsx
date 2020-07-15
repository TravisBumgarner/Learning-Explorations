import React from 'react'
import ReactDOM from 'react-dom'

import { HelloWorld } from './Components'

const App = () => {
    return (
        <div>
            <HelloWorld text="Bob" />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
