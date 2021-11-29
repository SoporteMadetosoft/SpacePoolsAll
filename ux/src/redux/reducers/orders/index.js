import { formTypes } from "../../types/orders/types"

// ** Initial State
const initialState = {
    price: 0,
    idTemporary: 0
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case formTypes.AddCost:
            return {
                ...state,
                price: action.payload
            }
        default:
            return state
    }
}

export default ordersReducer