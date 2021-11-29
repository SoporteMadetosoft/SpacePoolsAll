import { getNotificationDropDown } from "../../../utility/helpers/Axios/getNotificationDropDown"
import { alertTypes } from "../../types/alert/types"

export const AlertLoad = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: alertTypes.AlertLoad ,
            payload: await getNotificationDropDown('Alerts')
        }) 
    }
}