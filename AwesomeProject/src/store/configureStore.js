import { createStore, combineReducers } from 'redux'

import items from './reducers/items'

const rootReducer = combineReducers({
    items
});

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore