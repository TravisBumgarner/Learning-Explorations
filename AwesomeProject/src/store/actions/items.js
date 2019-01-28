import { ADD_ITEM, REMOVE_ITEM } from './actionTypes'

export const add = item => {
    return {
        type: ADD_ITEM,
        item
    }
}

export const remove = (key) => {
    return {
        type: REMOVE_ITEM,
        key
    }
}

