import { ActionTypes } from "../contants/action-types";

const initialState = {
    products:[]
}

export const productReducer = (state = initialState, {type, payload})=>{
    switch (type) {
        case ActionTypes.SET_PRODUCT:
            return {...state, products: payload}
        default:
            return state
    }
}

export const selectedProductReducer = (state = initialState, {type, payload})=>{
    switch (type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {...state, products: payload}
        default:
            return state
    }
}