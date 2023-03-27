import { useReducer, createContext, Provider } from 'react'

import { logger } from 'utilities'

type State = {
    message: {
        body: string
    } | null
    hasErrored: boolean
}

const EMPTY_STATE: State = {
    message: null,
    hasErrored: false,
}

type HasErrored = {
    type: 'HAS_ERRORED'
}

type AddMessage = {
    type: 'ADD_MESSAGE'
    data: {
        message: string
    }
}

type DeleteMessage = {
    type: 'DELETE_MESSAGE'
}

type Action =
    | AddMessage
    | DeleteMessage
    | HasErrored

const context = createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { },
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    },
)

const reducer = (state: State, action: Action): State => {
    console.log(action.type)
    switch (action.type) {
        case 'HAS_ERRORED': {
            return { ...state, hasErrored: true }
        }
        case 'ADD_MESSAGE': {
            return { ...state, message: { body: action.data.message } }
        }
        case 'DELETE_MESSAGE': {
            return { ...state, message: null }
        }
        default: {
            logger(`Swallowing action: ${JSON.stringify(action)}`)
            return state
        }
    }
}

const ResultsContext = ({ children }: { children: React.ReactChild }) => {
    const [state, dispatch] = useReducer(reducer, EMPTY_STATE)

    const { Provider } = context

    return (
        <Provider value={
            { state, dispatch }
        }>
            {children}
        </Provider>
    )
}

export default ResultsContext
export {
    context,
    Action,
}