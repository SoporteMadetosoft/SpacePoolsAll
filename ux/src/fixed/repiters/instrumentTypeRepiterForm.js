import { validator } from "../../utility/formValidator/ValidationTypes"

export const instrumentTypeRepiterForm = {
    structure: [],
    errors: {
        reference: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Instrumentos',
        endPoint: 'InstrumentTypes',
        structure: [ {} ],
        base: [
            {
                col: [5, 5, 5],
                name: 'instrumentType',
                label: 'Instrumentos',
                endPoint: 'InstrumentTypes',
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