import { types } from "../types"

// **  Initial State
const initialState = {
    payday: []
}
  
const paydayReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadPayDay:
            return { 
                payday: [...action.payload.data]
            }
        default:
            return state
    }
}

export default paydayReducer
  