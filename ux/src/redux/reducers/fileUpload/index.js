import { fileUploadTypes } from "../../types/fileUpload/types"

// ** Initial State
const initialState = {
    filePath: null,
    upload: null
}

const fileUpload = (state = initialState, action) => {
    switch (action.type) {

        case fileUploadTypes.SetDestination:
            return {
                ...state,
                filePath: action.payload
            }
        case fileUploadTypes.SetUpload:
            return {
                ...state,
                upload: action.payload
            }
        case fileUploadTypes.CleanUp:
            return initialState

        default:
            return state
    }
}

export default fileUpload
