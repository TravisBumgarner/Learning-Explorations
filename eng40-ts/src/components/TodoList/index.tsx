import * as React from 'react'

//TODO: Use .tsx and Webpack.Resolve together
import { Button } from '../../sharedComponents/'

type TodoListState = {
    x: number
}

const initialState: TodoListState = {
    x: 1
}

const reducer = (state: TodoListState, action: any): TodoListState => {
    console.log(state)
    switch (state) {
        default: {
            return { x: state.x + 1 }
        }
    }
}

const TodoList = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <div>
            <Button
                text="Add Item"
                onClick={() =>
                    dispatch({
                        type: 'addItem',
                        x: 5
                    })
                }
            />
        </div>
    )
}

export default TodoList
