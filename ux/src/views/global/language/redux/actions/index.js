import { list } from "@helpers/Axios/list"
import { types } from '../types'

export const startLanguages = (data) => ({
    type: types.loadLanguages,
    payload: { data }
})

export const startLoadingLanguages = () => {
    return async (dispatch) => {
        const data = await list('Language')
        dispatch(startLanguages(data))
    }
}