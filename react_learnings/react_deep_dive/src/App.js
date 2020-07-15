import React from 'react'
import ReactDOM from 'react-dom'

import DataContext from './DataContext'
import { HelloWorld, Input } from './Components'

const App = () => {
    const [value, setValue] = React.useState('')

    // If Provieder is passed object directly, will rerender all consumers every time.
    const contextValue = { value, setValue }

    return (
        <div>
            <DataContext.Provider value={contextValue}>
                <HelloWorld />
                <Input />
            </DataContext.Provider>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
