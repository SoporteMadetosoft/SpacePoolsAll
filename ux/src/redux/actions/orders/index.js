import { formTypes } from "../../types/orders/types"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from "../normalForm"
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

export const handleCalculateTotalCost = (column1, column2) => {
    return async (dispatch, getState) => {

        let totalCost = 0, contin = true, k = 0, row = ""
        for (let i = 0; i < 2; i++) {
            (i === 0) ? row = column1 : row = column2
            if (getState().normalForm[row]) {
                while (contin) {
                    (getState().normalForm[row][k]) ? totalCost += getState().normalForm[row][k]["coste"] : contin = false
                    k++
                }
                contin = true
                k = 0
            }
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

        } else dispatch(handleAddCost(totalCost))

    }
}


export const handleSearchOutID2 = (endpoint, position, arr) => {
    return async (dispatch, getState) => {
        const { idItem, idCanvasItem } = getState().normalForm[arr][position]
        //console.log(idItem.id)

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
            dispatch(handleCalculateTotalCost("extraItems", "baseItems"))
        }
    }
}


export const createItemRepeatersByPool = (idPool, idTemporar) => {
    return async (dispatch, getState) => {
        // dispatch(handleAugmentIdTemporary())
        // const actualitemsarray = getState().normalForm.baseItems
        // const lastItem = 
        // console.log('_______________________________________')
        // console.log(actualitemsarray)
        // console.log(actualitemsarray.length-1)


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
            if (pool.items[num]) {
                //console.log(pool.items[num])
                const formStructure = {
                    idItem: pool.items[num].idItem.id,
                    quantity: pool.items[num].cantidad,
                    coste: pool.items[num].coste,
                    name: pool.items[num].idItem.name
                    //     idCanvasItem : idTemporar
                }
                dispatch(addRepeaterRegister('baseItems', formStructure))

                // const item = await getFormData("Items", pool.items[num].idItem.id)
                // console.log(item)
                // const itemCanvasStructure = {
                //     id: pool.items[num].idItem.id,
                //     name: pool.items[num].idItem.name,
                //     width: 50,
                //     height: 50,
                //     isDragging: false,
                //     imgUrl: item.imgUrl
                // }
                // dispatch(addCanvasElement("elements", itemCanvasStructure))
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
    }
}


export const catchAndSetPrice = () => {
    return (dispatch, getState) => {
        const list = getState().normalForm
        if (list.price) {
            dispatch(handleAddCost(list.price))
        } else  dispatch(handleAddCost(0))
    }

}