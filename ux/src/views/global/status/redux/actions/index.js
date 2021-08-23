import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startStatus = (data) => ({
    type: types.loadStatus,
    payload: {data}
})

export const startLoadingStatus = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Status')    
        dispatch(startStatus(data))
    }
}