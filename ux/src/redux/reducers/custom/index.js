import { types } from "@redux/types/types"

const initialState = {
    registros: [],
    endPoint: null
}
  
  const registrosReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.load:
        return { 
            ...state,
            endPoint: action.payload.endPoint,
            registros: [...action.payload.data]
        }
      case types.delete:
        return {
          ...state,
          registros: state.registros.filter(reg => reg.id !== action.payload)
        }
      case types.cleaningAll:
        return {
          ...state,
          endPoint: null,
          registros: []
        }
      default:
        return state
    }
  }
  
  export default registrosReducer