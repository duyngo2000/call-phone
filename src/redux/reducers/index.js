import {combineReducers} from 'redux'
import {productReducer, selectedProductReducer} from './productReducer'

const reducer = combineReducers({
    //product
    allProducts: productReducer,
    product: selectedProductReducer,
})

export default reducer