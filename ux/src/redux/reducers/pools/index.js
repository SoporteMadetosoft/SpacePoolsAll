import { formTypes } from "../../types/pools/types"

// ** Initial State
const initialState = {
    value: 0,
    priceIVA: 0
}

const poolsReducer = (state = initialState, action) => {
    switch (action.type) {
        case formTypes.AddCost:
            return {
                ...state,
                value: action.payload
            }
        default:
            return state
    }
}

export default poolsReducer
