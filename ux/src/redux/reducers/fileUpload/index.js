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

        // case fileUploadTypes.DeleteFile:
        //     const newState = state['documents'].filter((element, index) => (element.url !== action.payload))
        //     return {
        //         ...state,
        //         ['documents']: [...newState]
        //     }

        default:
            return state
    }
}

export default fileUpload
