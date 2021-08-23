import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startCustomerType = (data) => ({
    type: types.loadCustomerType,
    payload: {data}
})

export const startLoadingCustomerType = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('CustomerType')    
        dispatch(startCustomerType(data))
    }
}