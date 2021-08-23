import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startBrands = (data) => ({
    type: types.loadBrands,
    payload: {data}
})

export const startLoadingBrands = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Brand')    
        dispatch(startBrands(data))
    }
}