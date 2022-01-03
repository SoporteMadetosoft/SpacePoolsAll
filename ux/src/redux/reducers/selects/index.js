import { selectTypes } from "../../types/selects/types"

// ** Initial State
const initialState = {}

const selectReducer = (state = initialState, action) => {
    switch (action.type) {

        case selectTypes.addSelectOptions:
            return {
                ...state,
                [action.payload.key]: action.payload.options
            }

        case selectTypes.cleanSelectOptions:
            return initialState

        default:
            return state
    }
}

export default selectReducer
