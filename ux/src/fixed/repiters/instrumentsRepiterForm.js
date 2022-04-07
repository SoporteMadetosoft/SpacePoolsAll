import { validator } from "../../utility/formValidator/ValidationTypes"

export const instrumentTypesRepiterForm = {
    structure: [],
    errors: {
        reference: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Instrumentos',
        endPoint: 'instrumentTypeInInstrumental',
        structure: [ {} ],
        base: [
            {
                col: [1, 1, 1],
                name: 'reference',
                label: 'Referencia'
            },
            {
                col: [5, 5, 5],
                name: 'instrumentType',
                label: 'Instrumentos',
                endPoint: 'InstrumentTypes',
                labelName: 'reference'
            },
            {
                col: [3, 3, 3],
                name: 'serialNumber',
                label: 'Nº serie'
            },
            {
                col: [3, 3, 3],
                name: 'description',
                label: 'Descripción'
            },
            {
                col: [2, 2, 2],
                name: 'gtin',
                label: 'Código de barras'
            }
        ]
    }
}