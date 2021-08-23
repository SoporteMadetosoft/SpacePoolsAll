import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startActivities = (data) => ({
    type: types.loadActivities,
    payload: {data}
})

export const startLoadingActivities = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Activity')    
        dispatch(startActivities(data))
    }
}