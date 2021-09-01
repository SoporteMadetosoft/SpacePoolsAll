import { list } from "@helpers/Axios/list"
import { types } from '../types'

export const startStatus = (data) => ({
    type: types.loadStatus,
    payload: { data }
})

export const startLoadingStatus = () => {
    return async (dispatch) => {
        const data = await list('Status')
        dispatch(startStatus(data))
    }
}