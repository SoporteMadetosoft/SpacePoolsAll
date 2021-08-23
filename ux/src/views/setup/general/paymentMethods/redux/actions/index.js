import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startPaymentMethods = (data) => ({
    type: types.loadPaymentMethods,
    payload: {data}
})

export const startLoadingsPaymentMethods = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('PaymentMethods')    
        dispatch(startPaymentMethods(data))
    }
}