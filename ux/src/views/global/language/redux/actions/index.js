import { getSetupSelectList } from "@helpers/Axios/getSetupSelectList"
import {types} from '../types'

export const startLanguages = (data) => ({
    type: types.loadLanguages,
    payload: {data}
})

export const startLoadingLanguages = () => {
    return async (dispatch) => {
        const data = await getSetupSelectList('Language')    
        dispatch(startLanguages(data))
    }
}