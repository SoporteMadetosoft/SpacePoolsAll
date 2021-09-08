import { formTypes } from "../../types/pools/types"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { editRepeaterRegister } from "../normalForm"

export const handleAddCost = (cost) => ({
    type: formTypes.AddCost,
    payload: cost
})


export const fillFormData = (data) => ({
    type: formTypes.fillFormData,
    payload: { ...data }
})

export const handleStartEditing = (endpoint, id) => {
    return async (dispatch) => {
        const data = await getFormData(endpoint, id)
        dispatch(fillFormData(data))
    }
}

export const handleCalcuteTotalCost = () => {
    return (dispatch, getState) => {
            let totalCost = 0, contin = true, k = 0, row = ""
            for (let i = 0; i < 2; i++) {
                (i === 0) ? row = "items" : row = "raws"
                while (contin) {
                    (getState().normalForm[row][k]) ? totalCost += getState().normalForm[row][k]["coste"] : contin = false
                    k++
                }
                contin = true
                k = 0
            }
            dispatch(handleAddCost(totalCost))
    }
}


export const handleSearchCost = (endpoint, idItem, position, arr) => {
    return async (dispatch, getState) => {
        //Obtenemos data // find 
        const {cost} = await getFormData(endpoint, idItem)
        const {cantidad} = getState().normalForm[arr][position]

        const producto = cost * cantidad
        
        //crear objeto he introducir el coste 
        const obj = {
            name: "coste",
            value: producto
            }
            dispatch(
                editRepeaterRegister(arr, position, obj)
                )
        
        //calcular e introducir coste total
        dispatch(handleCalcuteTotalCost())
    }
}

export const handleChangeOneCost = (key, position, obj) => ({
    type: formTypes.EditCostOfOne,
    payload: { key, position, obj }
})

export const handleSearchOutID = (endpoint,cantidad, position, arr) => {
    return async (dispatch, getState) => {
        const {idItem} = getState().normalForm[arr][position]
        console.log(idItem.id)
        if (idItem !== undefined) {
            const {cost} = await getFormData(endpoint, idItem.id)
            
            const producto = cost * cantidad
    
            //
            const obj = {
            name: "coste",
            value: producto
            }
            dispatch(editRepeaterRegister(arr, position, obj))

            //calcular e introducir coste total
            dispatch(handleCalcuteTotalCost())
        }
    }
}