import { types } from "../types"
import { getSetupSelectList } from "@helpers/axios/getSetupSelectList"
import { getSelectModelByBrand } from "@helpers/axios/getSelectModelByBrand"

const startSelects = (data) => {
    return {
        type: types.loadSelects,
        payload: data
    }
}

export const startLoadingSelects = () => {
    
    const selectNames = { 
        vehicleType: 'VehiclesTypes',
        containersSupported: 'ContainersTypes',
        brand: 'Brand',
        hookType: 'HookTypes',
        location: 'WareHouse'
    }

    return async (dispatch) => {
        for (const name in selectNames) {
            const opts = await getSetupSelectList(selectNames[name])
            
            dispatch(
                startSelects({ 
                    name, 
                    opts
                })
            )
        }
    }
}

export const startLoadingModelsByBrand = (brandId) => {

    return async (dispatch) => {
   
        const opts = await getSelectModelByBrand(brandId)
        
        dispatch(
            startSelects({ 
                name: 'model', 
                opts
            })
        )
    }
}

export const updateFormValue = (name, value) => {
    return {
        type: types.updateFormValue,
        payload: {name, value}
    }
}

export const addNewDocument = () => {
    return {
        type: types.addNewDocument
    }
}

export const removeDocument = (position) => {
    return {
        type: types.removeDocument,
        payload: { position }
    }
}

export const editInputDocument = ({ position, name, value }) => {
    return {
        type: types.editDocument,
        payload: {
            position, 
            name, 
            value 
        }
    }
}

export const cleanVehicleForm = () => {
    return {
        type: types.cleanVehicleForm
    }
}


export const startSaveVehicle = () => {
    return async (dispatch) => {
        dispatch(cleanVehicleForm())
    } 
}
