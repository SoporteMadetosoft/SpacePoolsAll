import { list } from "@helpers/Axios/list"
import { types } from '../types'

export const startPayDay = (data) => ({
    type: types.loadPayDay,
    payload: { data }
})

export const startLoadingPayDay = () => {
    return async (dispatch) => {
        const data = await list('PayDay')
        dispatch(startPayDay(data))
    }
}