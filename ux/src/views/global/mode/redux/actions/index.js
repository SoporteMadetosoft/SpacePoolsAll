import { list } from "@helpers/Axios/list"
import { types } from '../types'

export const startMode = (data) => ({
    type: types.loadMode,
    payload: { data }
})

export const startLoadingMode = () => {
    return async (dispatch) => {
        const data = await list('Mode')
        dispatch(startMode(data))
    }
}