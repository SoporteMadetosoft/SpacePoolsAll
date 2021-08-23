import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startAddress = (data) => ({
    type: types.loadAddressesTypes,
    payload: {data}
})

export const startLoadingAddresses = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('AddressesTypes')    
        dispatch(startAddress(data))
    }
}