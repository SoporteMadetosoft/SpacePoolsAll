import { types } from "../types"

// **  Initial State
const initialState = {
    status: []
}
  
const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadStatus:
            return { 
                status: [...action.payload.data]
            }
        default:
            return state
    }
}

export default statusReducer
  