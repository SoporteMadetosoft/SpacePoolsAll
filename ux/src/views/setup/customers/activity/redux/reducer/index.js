import { types } from "../types"

// **  Initial State
const initialState = {
    activities: []
}
  
const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadActivities:
            return { 
                activities: [...action.payload.data]
            }   
        default:
            return state
    }
}

export default activitiesReducer
  