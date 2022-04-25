import { validator } from "../../utility/formValidator/ValidationTypes"

export const instrumentalRepiterForm = {
    structure: [],
    errors: {
        reference: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Instrumentos',
        endPoint: 'instrumentTypeId',
        structure: [ {} ],
        base: [
            {
                col: [2, 2, 2],
                name: 'reference',
                label: 'Referencia'
            },
            {
                col: [5, 5, 5],
                name: 'Instrumental',
                label: 'Instrumental',
                endPoint: 'Instrumentals',
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