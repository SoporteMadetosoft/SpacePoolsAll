import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startMode = (data) => ({
    type: types.loadMode,
    payload: {data}
})

export const startLoadingMode = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Mode')    
        dispatch(startMode(data))
    }
}