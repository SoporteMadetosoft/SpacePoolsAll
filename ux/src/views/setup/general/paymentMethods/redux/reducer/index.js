import { types } from "../types"

// **  Initial State
const initialState = {
    paymentMethods: []
}
  
const paymentMethodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadPaymentMethods:
            return { 
                paymentMethods: [...action.payload.data]
            }
        default:
            return state
    }
}

export default paymentMethodsReducer
  