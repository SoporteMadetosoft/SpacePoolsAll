import { types } from "../types"

// **  Initial State
const initialState = {
    customerType: []
}
  
const customerTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadCustomerType:
            return { 
                customerType: [...action.payload.data]
            }
        default:
            return state
    }
}

export default customerTypeReducer
  