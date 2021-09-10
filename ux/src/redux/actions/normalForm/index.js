import { formTypes } from "../../types/normalForm/types"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"

export const handleChangeController = (name, value) => ({
    type: formTypes.inputChange,
    payload: { name, value }
})

export const initNormalForm = (structure) => ({
    type: formTypes.initForm,
    payload: structure
})

export const addRepeaterRegister = (key, structure) => ({
    type: formTypes.addRepeaterRegister,
    payload: { key, structure }
})

export const removeRepeaterRegister = (key, position) => ({
    type: formTypes.removeRepeaterRegister,
    payload: { key, position }
})

export const editRepeaterRegister = (key, position, obj) => ({
    type: formTypes.editRepeaterRegister,
    payload: { key, position, obj }
})

export const handleCleanForm = () => ({
    type: formTypes.cleanForm
})

export const handleCleanSection = (key) => ({
    type: formTypes.cleanSectionForm,
    payload: key
})

export const fillFormData = (data) => ({
    type: formTypes.fillFormData,
    payload: { ...data }
})

export const handleStartEditing = (endpoint, id) => {
    return async (dispatch) => {
        const data = await getFormData(endpoint, id)
        dispatch(fillFormData(data))
    }
}

export const handleGetForm = () => {
    return async (dispatch, getState) => {
        return getState().normalForm
    }
}