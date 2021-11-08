import { types } from "../types"

// **  Initial State
const initialState = {
  userData: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName]
      }
    case types.logout:
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }
    default:
      return state
  }
}

export default authReducer
