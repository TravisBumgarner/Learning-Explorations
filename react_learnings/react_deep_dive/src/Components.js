import React from 'react'
import DataContext from './DataContext'

const HelloWorld = () => {
    return (
        <DataContext.Consumer>
            {({ value }) => <p>Hello {value}</p>}
        </DataContext.Consumer>
    )
}

const Input = () => {
    const { value, setValue } = React.useContext(DataContext)
    return (
        <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    )
}

export { HelloWorld, Input }
