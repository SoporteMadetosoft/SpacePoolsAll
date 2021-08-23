import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startOrigin = (data) => ({
    type: types.loadOrigin,
    payload: {data}
})

export const startLoadingOrigin = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Origin')    
        dispatch(startOrigin(data))
    }
}