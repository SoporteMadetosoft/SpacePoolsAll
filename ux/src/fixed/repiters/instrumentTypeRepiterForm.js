import { validator } from "../../utility/formValidator/ValidationTypes"

export const instrumentTypeRepiterForm = {
    structure: [],
    errors: {
        instrumentTypeId: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Instrumentos',
        endPoint: 'instrumentalInstrumentType', // tiene que coincidir con el padre
        structure: {
            instrumentTypeId: '',
            amount: ''
        },
        base: [
            {
                col: [5, 5, 5],
                name: 'instrumentTypeId',
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