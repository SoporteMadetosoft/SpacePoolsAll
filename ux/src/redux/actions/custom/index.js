import { handleConfirmCancel } from '@helpers/handleConfirmCancel'

import { types } from "@redux/types/types"
import { erase } from '@helpers/Axios/delete'
import { list } from '@helpers/Axios/list'

export const cleaningAll = () => ({
    type: types.cleaningAll
})

export const setData = (data, endPoint) => ({
    type: types.load,
    payload: {
        data,
        endPoint
    }
})

export const startLoadingTable = (endPoint) => {
    return async (dispatch) => {
        dispatch(cleaningAll())
        const data = await list(endPoint)    
        dispatch(setData(data, endPoint))
    }
}

export const deleteRegister = (id) => ({
    type: types.delete,
    payload: id
})

export const startDeleteRegister = (id) => {
    return async (dispatch, getState) => {
        const endPoint = getState().registrosReducer.endPoint
        const respuesta = await handleConfirmCancel()
        if (respuesta === true) {
            erase(id, endPoint)
            dispatch(deleteRegister(id))
        }
    }
}
