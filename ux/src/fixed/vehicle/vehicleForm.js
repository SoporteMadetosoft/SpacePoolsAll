import { validator } from "../../utility/formValidator/ValidationTypes"

export const VehicleForm = {
    structure: {},
    errors: {
        plate: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 2, 2],
            readonly: true,
            name: 'id',
            label: 'Nº Vehicle'
        },
        {
            col: [2, 2, 2],
            name: 'plate',
            label: 'Matrícula'
        },
        {
            col: [2, 2, 2],
            name: 'brandId',
            label: 'Brand',
            endPoint: 'Brand'
        },
        {
            col: [2, 2, 2],
            name: 'modelId',
            label: 'Model',
            endPoint: 'Model'
        }
    ]
}