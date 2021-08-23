import { types } from "../types"

// **  Initial State
const initialState = {
    mode: []
}
  
const modeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadMode:
            return { 
                mode: [...action.payload.data]
            }
        default:
            return state
    }
}

export default modeReducer
  