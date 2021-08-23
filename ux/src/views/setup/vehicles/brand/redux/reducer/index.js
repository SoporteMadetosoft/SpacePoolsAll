import { types } from "../types"

// **  Initial State
const initialState = {
    brands: []
}
  
const brandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadBrands:
            return { 
                brands: [...action.payload.data]
            }
        default:
            return state
    }
}

export default brandsReducer
  