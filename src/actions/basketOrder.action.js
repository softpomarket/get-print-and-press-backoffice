import { 
    HTTP_BASKET_ORDER_FETCHING, 
    HTTP_BASKET_ORDER_SUCCESS, 
    HTTP_BASKET_ORDER_FAILED,
} from "../constants"

export const setBasketOrderStateToFetching = () => ({
    type: HTTP_BASKET_ORDER_FETCHING,
})

export const setBasketOrderStateToSuccess = (payload) => ({
    type: HTTP_BASKET_ORDER_SUCCESS,
    payload
})

export const setBasketOrderStateToFailed = () => ({
    type: HTTP_BASKET_ORDER_FAILED,
})