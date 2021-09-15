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

            if (getState().normalForm["Pool"]) {
                const {id} = getState().normalForm["Pool"]
                const {cost} = await getFormData("Pools", id)
                totalCost += cost
            }
            
            if (getState().normalForm["Iva"]) {
    
                const {name} = getState().normalForm["Iva"]
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
            const {cantidad} = getState().normalForm[arr][position]
            const producto = cost * cantidad
            
            
            const obj = {
            name: "coste",
            value: producto
            }
          dispatch(editRepeaterRegister(arr, position, obj))
        
          //calcular e introducir coste total
          dispatch(handleCalculateTotalCost("extraItems",""))
        }
    }
}


export const createItemRepeatersByPool = (poolId) => {
    return async (dispatch, getState) => {
        let num = 0
      let deletee = true
      while (deletee) {
          if (getState().normalForm.items[0]) {
              dispatch(removeRepeaterRegister('items', 0))
          } else deletee = false
          num++
      }

        


       const pool = await getFormData("Pools", poolId)
       let go = true
       num = 0
       while (go) {
           if (pool.items[num]) {
               console.log(pool.items[num])
               const formStructure = {
                   idItem: pool.items[num].idItem.id,
                   cantidad:  pool.items[num].cantidad,
                   coste: pool.items[num].coste,
                   nombre: pool.items[num].idItem.name
               }
               dispatch(addRepeaterRegister('items', formStructure))
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