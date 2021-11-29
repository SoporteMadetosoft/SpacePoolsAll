import { alertTypes } from "../../types/alert/types"
// ** Initial State
const initialState = {}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
        case alertTypes.AlertLoad:
            return {
                ...state,
                data: [...action.payload]
            }

        case alertTypes.AlertDelete:
            return {
                ...state,
                data: [...action.payload]
            }    
    default:
      return state
  }
}

export default alertReducer
