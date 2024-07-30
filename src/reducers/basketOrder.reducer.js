/* eslint-disable import/no-anonymous-default-export */
import { 
    HTTP_BASKET_ORDER_FETCHING, 
    HTTP_BASKET_ORDER_SUCCESS, 
    HTTP_BASKET_ORDER_FAILED 
} from "../constants"

const initialState = {
    resultBasketOrder : [],
    isFetching : false,
    isError : false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case HTTP_BASKET_ORDER_FETCHING:
            return { ...state, resultBasketOrder : null, isFetching : true, isError : false }
            
        case HTTP_BASKET_ORDER_SUCCESS:
            return { ...state, resultBasketOrder : payload, isFetching : false, isError : false }

        case HTTP_BASKET_ORDER_FAILED:
            return { ...state, resultBasketOrder : null, isFetching : false, isError : true }

        default:
            return state
    }
}
