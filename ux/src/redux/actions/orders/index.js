import { formTypes } from "../../types/orders/types"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { addRepeaterRegister, editRepeaterRegister, handleChangeController, removeRepeaterRegister } from "../normalForm"
import { PresetColorTypes } from "antd/lib/_util/colors"
import { addCanvasElement, prepareCanvasItemForm } from "../canvas"
import { List } from "react-feather"

export const handleAddCost = (cost) => ({
    type: formTypes.AddCost,
    payload: cost
})

export const handleAugmentIdTemporary = () => ({
    type: formTypes.AugmentIdTemporary
})

export const handleCalculateTotalCost = (column1, column2, isPool) => {
    return async (dispatch, getState) => {
        let totalCost = 0, contin = true, k = 0, row = ""
        for (let i = 0; i < 2; i++) {
            (i === 0) ? row = column1 : row = column2
            if (getState().normalForm[row]) {
                while (contin) {

                    if (getState().normalForm[row][k]) {
                        if (isNaN(getState().normalForm[row][k]["coste"])) {
                            totalCost += 0
                        } else {
                            totalCost += getState().normalForm[row][k]["coste"]
                        }
                    } else contin = false


                    // (getState().normalForm[row][k]) ? totalCost += getState().normalForm[row][k]["coste"] : contin = false
                    k++
                }
                contin = true
                k = 0
            }
        }



        if (isPool === 1 && getState().normalForm["price"]) {
            const price = parseFloat(getState().normalForm.price)
            totalCost += price
        }

        if (getState().normalForm["idPool"]) {
            const { id } = getState().normalForm["idPool"]
            const { cost } = await getFormData("Pools", id)
            totalCost += cost
        }

        if (getState().normalForm["idTax"]) {
            const { name } = getState().normalForm["idTax"]
            totalCost *= ((name / 100) + 1)
        }
        totalCost = totalCost.toFixed(2)
        if (totalCost === null || totalCost === undefined || totalCost === "NaN") {

        } else {
            dispatch(handleAddCost(totalCost))
            if (isPool !== 1) dispatch(handleChangeController('price', totalCost))
        }

    }
}


export const handleSearchOutID2 = (endpoint, position, arr, arrCalcu1, arrCalcu2) => {
    return async (dispatch, getState) => {
        const { idItem, idCanvasItem } = getState().normalForm[arr][position]

        if (idItem !== undefined) {
            const { cost } = await getFormData(endpoint, idItem.id)
            const { quantity } = getState().normalForm[arr][position]
            const producto = cost * parseInt(quantity)

            const obj = {
                name: "coste",
                value: producto
            }
            dispatch(editRepeaterRegister(arr, position, obj))

            //calcular e introducir coste total
            let isPool = 0
            if (arrCalcu1 === 'raws' && arrCalcu2 === 'items') {
                isPool = 1
            }
            dispatch(handleCalculateTotalCost(arrCalcu1, arrCalcu2, isPool))
        }
    }
}


export const createItemRepeatersByPool = (idPool) => {
    return async (dispatch, getState) => {

        let num = 0
        let deletee = true
        while (deletee) {
            if (getState().normalForm.baseItems[0]) {
                dispatch(removeRepeaterRegister('baseItems', 0))
            } else deletee = false
            num++
        }


        const pool = await getFormData("Pools", idPool)

        let go = true
        num = 0
        while (go) {
            if (pool.allItems[num]) {

                const formStructure = {
                    idItem: pool.allItems[num].idItem.id,
                    quantity: pool.allItems[num].quantity,
                    colores: pool.allItems[num].colores,
                    idColor: pool.allItems[num].idColor,
                    coste: pool.allItems[num].coste,
                    name: pool.allItems[num].idItem.name
                }

                dispatch(addRepeaterRegister('baseItems', formStructure))
            } else go = false
            num++
        }
    }
}


export const handleLessPrice = (position) => {
    return (dispatch, getState) => {
        const { coste, quantity } = getState().normalForm.baseItems[position]
        const resta = coste * quantity
        let { price } = getState().ordersReducer


        if (getState().normalForm.Iva) {
            const iva = getState().normalForm.Iva.name
            price *= ((iva / 100) + 1)
        }

        let totalCost = price - resta
        totalCost = totalCost.toFixed(2)
        dispatch(handleAddCost(totalCost))
        dispatch(handleChangeController('price', totalCost))
    }
}


export const catchAndSetPrice = (numE) => {
    return (dispatch, getState) => {
        if (numE === 0) {
            dispatch(handleAddCost(0))
        } else {
            const list = getState().normalForm
            if (list.price) {
                dispatch(handleAddCost(list.price))
            } //else dispatch(handleAddCost(0))
        }

    }

}

export const handleFillCustomerData = (idCustomer) => {
    return async (dispatch, getState) => {
        const customerData = await getFormData("Customers", idCustomer)
        customerData['addresses'].map(
            elements => {
                if (elements.addressType.id === 1) {
                    dispatch(handleChangeController('deliveryAddress', `${elements.address}, ${elements.population}`))
                }
            }
        )
        dispatch(handleChangeController('phone', customerData['phone']))
        dispatch(handleChangeController('email', customerData['email']))

    }
}
