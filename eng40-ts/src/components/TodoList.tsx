import * as React from 'react'

//TODO: Use .tsx and Webpack.Resolve together
import { Button } from '../sharedComponents'

type TodoListItemType = {
    task: string
    id: number
}

type TodoListStateType = {
    items: TodoListItemType[]
}

type newItemActionType = {
    type: 'addItem'
    task: string
}

type removeItemActionType = {
    type: 'removeItem'
    id: number
}

type actionType = newItemActionType | removeItemActionType

const initialState: TodoListStateType = {
    items: []
}

let currentId = 0 // LOL don't do this
const reducer = (state: TodoListStateType, action: any): TodoListStateType => {
    console.log(state)
    switch (action.type) {
        case 'addItem': {
            currentId += 1
            const newItem: TodoListItemType = { task: action.task, id: currentId }
            return { ...state, items: [...state.items, newItem] }
        }
        case 'removeItem': {
            console.log('i happen')
            const modifiedItems = state.items.filter(({ id }) => id !== action.id)
            return { ...state, items: modifiedItems }
        }
        default: {
            return state
        }
    }
}

const TodoList = () => {
    const [{ items }, dispatch] = React.useReducer(reducer, initialState)
    const [input, setInput] = React.useState('')

    const Items =
        items &&
        items.map(({ task, id }) => (
            <li key={id}>
                {task}
                <button
                    onClick={() => {
                        const action: actionType = {
                            type: 'removeItem',
                            id
                        }
                        dispatch(action)
                    }}
                >
                    Remove {id}
                </button>
            </li>
        ))

    return (
        <div>
            <input
                value={input}
                onChange={event => {
                    setInput(event.target.value)
                }}
            />
            <Button
                text="Add Item"
                // TODO: how to type check on dispatch() properly
                onClick={() => {
                    const action: actionType = {
                        type: 'addItem',
                        task: input
                    }
                    dispatch(action)
                    setInput('')
                }}
            />
            <ul>{Items}</ul>
        </div>
    )
}

export default TodoList
