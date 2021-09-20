import { formTypes } from "../../types/orders/types"
import { getFormData } from "../../../utility/helpers/Axios/getFormData"
import { addRepeaterRegister, editRepeaterRegister, removeRepeaterRegister } from "../normalForm"
import { PresetColorTypes } from "antd/lib/_util/colors"

export const handleAddCost = (cost) => ({
    type: formTypes.AddCost,
    payload: cost
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
            console.log("ÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑ")
            console.log(totalCost)
            if (getState().normalForm["idPool"]) {
                const {id} = getState().normalForm["idPool"]
                const {cost} = await getFormData("Pools", id)
                totalCost += cost
            }
            
            if (getState().normalForm["idTax"]) {
    
                const {name} = getState().normalForm["idTax"]
                totalCost *= ((name / 100) + 1)
            
                console.log(totalCost)
    
            }
            totalCost = totalCost.toFixed(2) 
            dispatch(handleAddCost(totalCost))
        
    }
}


export const handleSearchOutID2 = (endpoint, position, arr) => {
    return async (dispatch, getState) => {
        const {idItem} = getState().normalForm[arr][position]
        console.log(idItem.id)
        if (idItem !== undefined) {
            const {cost} = await getFormData(endpoint, idItem.id)
            const {quantity} = getState().normalForm[arr][position]
            const producto = cost * parseInt(quantity)
            
            const obj = {
            name: "coste",
            value: producto
            }
          dispatch(editRepeaterRegister(arr, position, obj))
        
          //calcular e introducir coste total
          dispatch(handleCalculateTotalCost("extraItems","baseItems"))
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
           if (pool.items[num]) {
               //console.log(pool.items[num])
               const formStructure = {
                   idItem: pool.items[num].idItem.id,
                   cantidad:  pool.items[num].cantidad,
                   coste: pool.items[num].coste,
                   quantity: pool.items[num].idItem.name
               }
               dispatch(addRepeaterRegister('baseItems', formStructure))
           } else go = false
           num++
       }
    }
}


export const handleLessPrice = (position) => {
    return (dispatch, getState) => {
        const {coste, cantidad} = getState().normalForm.items[position]
        const resta = coste * cantidad
        let {price} = getState().ordersReducer

       
        if (getState().normalForm.Iva) {
            const iva = getState().normalForm.Iva.name
            price *= ((iva / 100) + 1)
        }

        const totalCost = price - resta
        totalCost = totalCost.toFixed(2) 
        dispatch(handleAddCost(totalCost))
}

}