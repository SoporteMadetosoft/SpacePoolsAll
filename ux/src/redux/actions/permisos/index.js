import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { formTypes } from "../../types/permisos/types"

export const SwitchPermission = (key, permiso, value) => ({
    type: formTypes.SwitchPermission,
    payload: { key, permiso, value }
})

export const SwitchPermissionAll = (key, value) => ({
    type: formTypes.SwitchPermissionAll,
    payload: { key, value }
})

export const handleFillPermissions = (endpoint, id) => {
    return async (dispatch) => {
        const data = await getFormData(endpoint, id)
        delete data.id
        delete data.name
        delete data.productionStatus
        dispatch({
            type: formTypes.FillPermision,
            payload: { ...data }
        })
    }
}

export const setInitialPermissions = () => {
    return (dispatch, getState) => {
        dispatch({
            type: formTypes.CleanPermisions
        })
    }
}