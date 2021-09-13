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

        case formTypes.cleanSectionForm:
            return {
                ...state,
                [action.payload]: []
            }

        case formTypes.initForm:
            return {
                ...action.payload
            }

        case formTypes.addRepeaterRegister:
            console.log("-----------")
            console.log(action.payload)
            return {
                ...state,
                [action.payload.key]: [
                    ...state[action.payload.key],
                    { ...action.payload.structure }
                ]
            }

        case formTypes.removeRepeaterRegister:
            const newState = state[action.payload.key].filter((element, index) => (index !== action.payload.position))
            return {
                ...state,
                [action.payload.key]: [...newState]
            }

        case formTypes.editRepeaterRegister:
            const { key, position, obj } = action.payload
            state[key][position] = {
                ...state[key][position],
                [obj.name]: obj.value
            }
            return {
                ...state,
                [key]: [...state[key]]
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
