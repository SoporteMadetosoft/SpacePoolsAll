import { types } from "../types"

// **  Initial State
const initialState = {
    customerCategory: []
}
  
const customerCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadCustomerCategory:
            return { 
                customerCategory: [...action.payload.data]
            }
        default:
            return state
    }
}

export default customerCategoryReducer
  