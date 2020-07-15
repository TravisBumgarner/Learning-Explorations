import React from 'react'
import ReactDOM from 'react-dom'

import DataContext from './DataContext'
import { HelloWorld, Input, Delete, ChangeGreeting } from './Components'

const AVAILABLE_GREETINGS = ['Hello', 'Ciao', 'Greetings', 'Hola']

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateName':
            return { ...state, name: action.name }
        case 'deleteName':
            return { ...state, name: '' }
        case 'changeGreeting':
            return {
                ...state,
                greeting:
                    AVAILABLE_GREETINGS[
                        (state.greetingIndex + 1) % AVAILABLE_GREETINGS.length
                    ],
                greetingIndex: (state.greetingIndex += 1),
            }
        default:
            throw new Error()
    }
}

const INITIAL_STATE = {
    greetingIndex: 0,
    greeting: AVAILABLE_GREETINGS[0],
    name: '',
}

const App = () => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
    // If Provieder is passed object directly, will rerender all consumers every time.
    const contextValue = { state, dispatch }

    return (
        <div>
            <DataContext.Provider value={contextValue}>
                <HelloWorld />
                <Input />
                <Delete />
                <ChangeGreeting />
            </DataContext.Provider>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
