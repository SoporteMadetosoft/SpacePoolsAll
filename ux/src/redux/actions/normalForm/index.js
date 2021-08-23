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

export const addRepeaterRegister = (key) => ({
    type: formTypes.addRepeaterRegister,
    payload: key
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


export const fillFormData = (data) => ({
    type: formTypes.fillFormData,
    payload: { ...data }
})

export const handleStartEditing = (endpoint, id) => {
    return async (dispatch) => {
        const data = await getFormData(endpoint, id)
        const base = data.base
        delete data.base
        console.log({ ...data, ...base })
        dispatch(fillFormData({ ...data, ...base }))
    }
  }
