import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startPayDay = (data) => ({
    type: types.loadPayDay,
    payload: {data}
})

export const startLoadingPayDay = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('PayDay')    
        dispatch(startPayDay(data))
    }
}