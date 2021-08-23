import { types } from "../types"

// **  Initial State
const initialState = {
    origin: []
}
  
const originReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadOrigin:
            return { 
                origin: [...action.payload.data]
            }
        default:
            return state
    }
}

export default originReducer
  