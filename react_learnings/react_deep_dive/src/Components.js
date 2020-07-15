import React from 'react'
import DataContext from './DataContext'

const HelloWorld = () => {
    return (
        <DataContext.Consumer>
            {({ state }) => (
                <p>
                    {state.greeting} {state.name}
                </p>
            )}
        </DataContext.Consumer>
    )
}

const Delete = () => {
    const { dispatch } = React.useContext(DataContext)
    return (
        <button onClick={() => dispatch({ type: 'deleteName' })}>Delete</button>
    )
}

const ChangeGreeting = () => {
    const { dispatch } = React.useContext(DataContext)
    return (
        <button onClick={() => dispatch({ type: 'changeGreeting' })}>
            Change Greeting
        </button>
    )
}

const Input = () => {
    const { state, dispatch } = React.useContext(DataContext)
    return (
        <input
            value={state.name}
            onChange={(event) =>
                dispatch({
                    type: 'updateName',
                    name: event.target.value,
                })
            }
        />
    )
}

export { HelloWorld, Input, Delete, ChangeGreeting }
