import { types } from "../types"

// **  Initial State
const initialState = {
    form: {
        values: {
            documents:[]
        },
        config: {
            selectsOPTs: {
                
            }
        }
    }
}
  
const vehicleReducer = (state = initialState, action) => {

    const { config, values } = state.form
    const { payload } = action

    switch (action.type) {
        case types.loadSelects:
            return { 
                form: {
                    ...state.form,
                    config: { 
                        ...config,
                        selectsOPTs: {
                            ...config.selectsOPTs,
                            [payload.name]: payload.opts
                        }
                    }
                } 
            }

        case types.updateFormValue:
            return {
                form: {
                    ...state.form,
                    values: {
                        ...values,
                        [payload.name]: payload.value
                    }
                }
            }

        case types.addNewDocument:
            return {
                form: {
                    ...state.form,
                    values: {
                        ...values,
                        documents: [
                            ...values.documents,
                            { 
                                name: '',
                                expDate: '',
                                url: ''
                            }
                        ]
                    }
                }
            }
        case types.removeDocument:
            values.documents.splice(payload.position, 1)
            return {
                form: {
                    ...state.form,
                    values: {
                        ...values,
                        documents: [...values.documents]
                    }
                }
            }

        case types.editDocument :
            values.documents[payload.position] = { 
                ...values.documents[payload.position],
                [payload.name]: payload.value
            }
            return {
                form: {
                    ...state.form,
                    values: {
                        ...values,
                        documents: [...values.documents]
                    }
                }
            }
        case types.cleanVehicleForm :
            return {}
            

        default:
            return state
    }
}

export default vehicleReducer