import { validator } from "../../utility/formValidator/ValidationTypes"

export const materialRepiterForm = {
    structure: [],
    errors: {
        reference: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Materiales',
        endPoint: 'Materials',
        structure: [ {} ],
        base: [
            {
                col: [5, 5, 5],
                name: 'Material',
                label: 'Material',
                endPoint: 'Materials',
                labelName: 'reference'
            },
            {
                col: [5, 5, 5],
                name: 'amount',
                label: 'Cantidad'
            }
        ]
    }
}