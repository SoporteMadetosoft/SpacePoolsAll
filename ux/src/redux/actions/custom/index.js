import { handleDeleteConfirmation } from '@helpers/handleDeleteConfirmation'
import { types } from "@redux/types/types"
import { listFilter } from '../../../utility/helpers/Axios/listFilter'
import { fetch } from '../../../utility/helpers/Axios/fetch'

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
        const data = await fetch(endPoint)
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
        const respuesta = await handleDeleteConfirmation()
        if (respuesta === true) {
            fetch(endPoint, id, {}, 'DELETE')
            dispatch(deleteRegister(id))
        }
    }
}

export const startDeleteRepairRegister = (id, index, endPoint) => {
    return async (dispatch) => {
        const respuesta = await handleDeleteConfirmation()
        if (respuesta === true) {
            fetch(endPoint, id, {}, 'DELETE')
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

export const handleChange = (valor, name, index) => {

    return async (dispatch) => {
        dispatch({
            type: types.change,
            payload: {
                valor,
                name,
                index
            }
        })
    }
}

export const startLoadingTableFilter = (endPoint, form) => {

    return async (dispatch) => {
        dispatch(cleaningAll())

        const data = await listFilter(endPoint, form)

        dispatch(setData(data.data.data, endPoint))
    }
}
