import { types } from "../types"

// **  Initial State
const initialState = {
    address: []
}
  
const addressesTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadAddressesTypes:
            return { 
                address: [...action.payload.data]
            }
        default:
            return state
    }
}

export default addressesTypesReducer
  