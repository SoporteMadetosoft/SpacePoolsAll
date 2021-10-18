import { handleConfirmCancel } from '@helpers/handleConfirmCancel'
import { handleConfirmCancelDeliveryNote } from '@helpers/handleConfirmCancelDeliveryNote'

import { types } from "@redux/types/types"
import { erase } from '@helpers/Axios/delete'
import { list } from '@helpers/Axios/list'
import { startAddSelectOptions } from '../selects'


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

export const startDeleteRegister = (id, end = null) => {
    return async (dispatch, getState) => {
        const endPoint = end !== null ? end : getState().registrosReducer.endPoint
        const respuesta = await handleConfirmCancel()
        if (respuesta === true) {
            erase(id, endPoint)
            dispatch(deleteRegister(id))
        }
    }
}

export const startDeleteRepairRegister = (id, index, endPoint) => {
    return async (dispatch, getState) => {
        const respuesta = await handleConfirmCancel()
        if (respuesta === true) {
            erase(id, endPoint)
            dispatch({
                type: types.deleteRepair,
                payload: {
                    id,
                    index
                }
            })
        }
    }
}

export const startSelectDriver = (id, index, endPoint) => {
    return async (dispatch, getState) => {
        dispatch(startAddSelectOptions('Carriers','Carriers'))
        
        const carriers = getState().selectReducer.Carriers 
        console.log(carriers)

        const respuesta = await handleConfirmCancelDeliveryNote(carriers)
        if (respuesta === true) {

        }


    }




}