import * as React from 'react'

//TODO: Use .tsx and Webpack.Resolve together
import { Button } from '../../sharedComponents/'

const validActions = {
    addItem: 'addItem',
    removeItem: 'removeItem'
}

type TodoListStateType = {
    items: string[]
}

const initialState: TodoListStateType = {
    items: []
}

const reducer = (state: TodoListStateType, action: any): TodoListStateType => {
    console.log('I happen')
    console.log(action)
    switch (action.type) {
        case validActions.addItem: {
            return { ...state, items: [...state.items, action.item] }
        }
        case validActions.removeItem: {
            return state
        }
        default: {
            return state
        }
    }
}

const TodoList = () => {
    const [{ items }, dispatch] = React.useReducer(reducer, initialState)

    const Items = items.map(item => <li>{item}</li>)
    // const Items = items.join(', ')
    // console.log(Items, 'i')
    return (
        <div>
            <Button
                text="Add Item"
                // TODO: how to type check on dispatch()
                onClick={() =>
                    dispatch({
                        type: validActions.addItem,
                        item: 'New Item'
                    })
                }
            />
            <ul>{Items}</ul>
        </div>
    )
}

export default TodoList
