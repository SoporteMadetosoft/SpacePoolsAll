import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startCustomerCategory = (data) => ({
    type: types.loadCustomerCategory,
    payload: {data}
})

export const startLoadingCustomerCategory = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('CustomerCategory')    
        dispatch(startCustomerCategory(data))
    }
}