import { formTypes } from "../../types/normalForm/types"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import axios from "axios"
import { endPoints } from "@fixed/endPoints"

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

export const setIdInOrderCode = (endPoint, name) => {
    return async (dispatch, getState) => {
        setTimeout(async function() {
            if (getState().normalForm.id) {
                console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
                const id = getState().normalForm.id
                dispatch(handleChangeController(name, id ))
            } else {
                const { data: { data } } = await axios.get(`${process.env.REACT_APP_HOST_URI}${endPoints[endPoint]}/list`)
                let i = 0
                let next = true
                let id = 0
                while (next) {
                    if (data[i]) {
                        id = data[i].id
                    } else next = false
                    i++
                }
                id++
                dispatch(handleChangeController(name, id))
            }
        },200)
    }
}