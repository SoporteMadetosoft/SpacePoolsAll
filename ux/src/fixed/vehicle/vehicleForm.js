import { validator } from "../../utility/formValidator/ValidationTypes"

export const VehicleForm = {
    structure: {},
    errors: {
        plate: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readonly: true,
            name: 'id',
            label: 'Nº Vehicle'
        },
        {
            col: [3, 3, 3],
            name: 'plate',
            label: 'Matrícula'
        },
        {
            col: [4, 4, 4],
            name: 'brandId',
            label: 'Marca',
            endPoint: 'Brand'
        },
        {
            col: [4, 4, 4],
            name: 'modelId',
            label: 'Modelo',
            endPoint: 'Model',
            master: {
                name: 'brandId',
                endPoint: 'Brand',
                onChange: (value) => {
                    return value ? {filter: [`brandId||$eq||${value}`]} : null
                } 
            }
        }
    ]
}