import { validator } from "../../../utility/formValidator/ValidationTypes"

export const ModelForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 6, 6],
            name: 'name',
            label: 'Modelo'
        },
        {
            col: [6, 6, 6],
            name: 'brandId',
            label: 'Marca',
            endPoint: 'Brand'
        }
    ]
}