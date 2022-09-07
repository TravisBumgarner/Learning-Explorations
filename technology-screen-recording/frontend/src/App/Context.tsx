import React from 'react'

type State = {
    videos: Record<string, string>,
    selectedVideo: string | null
}

const EMPTY_STATE: State = {
    videos: {},
    selectedVideo: null
}

type AddVideoAction = {
    type: 'ADD_VIDEO',
    payload: {
        src: string,
        filename: string
    }
}

type SetSelectedVideoAction = {
    type: 'SET_SELECTED_VIDEO',
    payload: string
}


type Action =
    | AddVideoAction
    | SetSelectedVideoAction


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_VIDEO': {
            return { ...state, videos: {...state.videos, [action.payload.filename]: action.payload.src} }
        }
        case 'SET_SELECTED_VIDEO': {
            return {...state, selectedVideo: action.payload}
        }
        default:
            throw new Error('Unexpected action')
    }
}

const context = React.createContext(
    {
        state: EMPTY_STATE,
        dispatch: () => { },
    } as {
        state: State,
        dispatch: React.Dispatch<Action>
    },
)

const ResultsContext = ({ children }: { children: React.ReactChild }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)
    const { Provider } = context

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
export {
    context
}