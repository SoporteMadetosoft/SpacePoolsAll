import { formTypes } from "../../types/normalForm/types"

// ** Initial State
const initialState = {}
  
const normalForm = (state = initialState, action) => {
    switch (action.type) {

        case formTypes.inputChange:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        
        case formTypes.cleanForm:
            return initialState
        
        case formTypes.initForm:
            return {
                ...action.payload
            }

        case formTypes.addRepeaterRegister:
            return {
                ...state,
                [action.payload]: [ ...state[action.payload], {}]
            }

        case formTypes.removeRepeaterRegister:
            state[action.payload.key].splice(action.payload.position, 1)
            return {
                ...state,
                [action.payload.key]: [ ...state[action.payload.key] ]
            }
        
        case formTypes.editRepeaterRegister:
            const { key, position, obj } = action.payload
            state[key][position] = { 
                ...state[key][position],
                 [obj.name]: obj.value
            }
            return {
                ...state,
                [key]: [ ...state[key] ] 
            }
        case formTypes.fillFormData:
            
            return {
                ...action.payload
            }

        default:
            return state
    }
}
  
export default normalForm
  