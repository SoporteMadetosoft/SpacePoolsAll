import { types } from "../types"

// **  Initial State
const initialState = {
    departments: []
}
  
const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadDepartments:
            return { 
                departments: [...action.payload.data]
            }
        default:
            return state
    }
}

export default departmentsReducer
  