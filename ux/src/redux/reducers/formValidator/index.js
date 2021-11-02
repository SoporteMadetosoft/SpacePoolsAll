import { formValidatorTypes } from "../../types/formValidator"

// ** Initial State
const initialState = {
    schema: {},
    errors: {}
}
  
const formValidator = (state = initialState, action) => {
    switch (action.type) {

        case formValidatorTypes.setSchema:
            return {
                ...state,
                schema: {
                    ...action.payload
                }
            }
        case formValidatorTypes.removeSchema:
            return initialState
        case formValidatorTypes.setErrors:
            return {
                ...state,
                errors: { ...action.payload }
            }
        case formValidatorTypes.removeError:
            return {
                ...state,
                errors:{ ...action.payload }
            }


        case formValidatorTypes.cleanFormValidator:
            return  initialState

        default:
            return state
    }
}
  
export default formValidator