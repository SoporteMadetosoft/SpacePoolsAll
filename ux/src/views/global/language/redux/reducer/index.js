import { types } from "../types"

// **  Initial State
const initialState = {
    languages: []
}
  
const languagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadLanguages:
            return { 
                languages: [...action.payload.data]
            }
        default:
            return state
    }
}

export default languagesReducer
  