import { ADD_ITEM, REMOVE_ITEM } from '../actions/actionTypes'

const initialState = {
    items: []

}

export default itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: state.places.concat({
                    key: Math.random(),
                    item: action.item,
                })
            }
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.places.filter(item => {
                    return item.key !== action.key
                })
            }
        default:
            return state
    }
}
