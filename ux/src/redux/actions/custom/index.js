import { handleConfirmCancel } from '@helpers/handleConfirmCancel'
import { types } from "@redux/types/types"
import { erase } from '@helpers/Axios/delete'
import { list } from '@helpers/Axios/list'
import { save } from '../../../utility/helpers/Axios/save'
import { handleSelectCarrier } from '../../../utility/helpers/handleSelectCarrier'
import { listProduction } from '../../../utility/helpers/Axios/listProduction'
import { listDelivery } from '../../../utility/helpers/Axios/listDelivery'


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