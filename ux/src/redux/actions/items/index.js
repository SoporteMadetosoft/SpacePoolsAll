import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { editRepeaterRegister } from "../normalForm"
import InputGroup from "reactstrap/lib/InputGroup"
import { itemsTypes } from "../../types/items/types"

export const handleSearchCost = (endpoint, idItem, position, arr) => {
    return async (dispatch) => {
        const {cost} = await getFormData(endpoint, idItem)
        const obj = {
            name: "cost",
            value: cost
            }
            dispatch(
                editRepeaterRegister(arr, position, obj)
                )
    }
}

export const handleSearchStock = (endpoint, idItem, position, arr) => {
    return async (dispatch) => {
        const {stock} = await getFormData(endpoint, idItem)
        const obj = {
            name: "stock",
            value: stock
            }
            dispatch(
                editRepeaterRegister(arr, position, obj)
                )
    }
}

export const addSelectionOnNormalForm = (key, options, arr, position) => {
    return async (dispatch, getState) => {
        
        const obj = {
            name: key,
            value: options
        }

        dispatch( editRepeaterRegister(arr, position, obj))
    }
}