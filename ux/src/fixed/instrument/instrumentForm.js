import { validator } from "../../utility/formValidator/ValidationTypes"

export const InstrumentForm = {
    structure: {},
    errors: {
        gtin: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readonly: true,
            name: 'id',
            label: 'Nº Instrument'
        },
        {
            col: [4, 4, 4],
            name: 'gtin',
            label: 'Código de barras'
        },
        {
            col: [3, 3, 3],
            name: 'weight',
            label: 'Peso'
        },
        {
            col: [2, 2, 2],
            name: 'lastReviewDate',
            label: 'Fecha última revisión',
            endPoint: 'lastDate',
            type: "date"
        },
        {
            col: [2, 2, 2],
            name: 'status',
            label: 'Estado',
            endPoint: 'Status',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        },
        {
            col: [6, 6, 6],
            name: 'reference',
            label: 'Referencia'
        },
        {
            col: [6, 6, 6],
            name: 'serialNumber',
            label: 'Nº serie'
        },
        {
            col: [6, 6, 6],
            name: 'familyId',
            label: 'Familia',
            endPoint: 'Family'
        },
        {
            col: [6, 6, 6],
            name: 'subFamilyId',
            label: 'Subfamilia',
            endPoint: 'Family'
        },
        {
            col: [12, 12, 12],
            name: 'description',
            label: 'Descripción'
        }
    ]
}