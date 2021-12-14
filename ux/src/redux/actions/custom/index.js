import { handleDeleteConfirmation } from '@helpers/handleDeleteConfirmation'
import { types } from "@redux/types/types"
import { deleteRecord } from '@helpers/Axios/deleteRecord'
import { list } from '@helpers/Axios/list'
import { save } from '../../../utility/helpers/Axios/save'
import { handleSelectCarrier } from '../../../utility/helpers/handleSelectCarrier'
import { listProduction } from '../../../utility/helpers/Axios/listProduction'
import { listDelivery } from '../../../utility/helpers/Axios/listDelivery'
import axios from 'axios'

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
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        dispatch(cleaningAll())
        const data = await list(endPoint, source)

        dispatch(setData(data, endPoint))
        // if (data.length === 60) {
        //     const data2 = await list(endPoint, 2)
        //     dispatch(setData(data2, endPoint))
        // }
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
            deleteRecord(id, endPoint)
            dispatch(deleteRegister(id))
        }
    }
}

export const startDeleteRepairRegister = (id, index, endPoint) => {
    return async (dispatch, getState) => {
        const respuesta = await handleDeleteConfirmation()
        if (respuesta === true) {
            deleteRecord(id, endPoint)
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

export const startSelectDriver = ({ idOrder, idCustomer }, endPoint) => {
    return async (dispatch, getState) => {
        const carriers = getState().selectReducer.Carriers
        const respuesta = await handleSelectCarrier(carriers)
        const driver
            = {
            idStatus: 2,
            idCarrier: respuesta,
            idOrder,
            idCustomer,
            signature: ''
        }
        if (respuesta !== false) {
            save(endPoint, null, driver)
        }
    }
}

export const startLoadingTableProduction = (endPoint) => {
    return async (dispatch) => {
        dispatch(cleaningAll())
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = await listProduction(endPoint, userData['productionStatus'])
        dispatch(setData(data, endPoint))
    }
}

export const startLoadingTableDelivery = (endPoint) => {
    return async (dispatch) => {
        dispatch(cleaningAll())
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = await listDelivery(endPoint, userData['id'])
        dispatch(setData(data, endPoint))
    }
}

export const handleChange = (valor, name, index) => {

    return async (dispatch, getState) => {
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
