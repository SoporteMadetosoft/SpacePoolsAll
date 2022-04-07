import { validator } from "../../utility/formValidator/ValidationTypes"
import { instrumentTypesRepiterForm } from "../repiters/instrumentsRepiterForm"

export const InstrumentalForm = {
    structure: {
        instrumentTypeInInstrumental: instrumentTypesRepiterForm.structure
    },
    errors: {
        gtin: { validations: [validator.isRequired] },
        instrumentTypeInInstrumental: instrumentTypesRepiterForm.errors
    },
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº InstrumentType'
        },
        {
            col: [3, 3, 3],
            name: 'gtin',
            label: 'Código de barras'
        },
        {
            col: [2, 2, 2],
            name: 'status',
            label: 'Estado',
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
            name: 'familyId',
            label: 'Familia',
            endPoint: 'Family'
        },
        {
            col: [6, 6, 6],
            name: 'subFamilyId',
            label: 'Subfamilia',
            endPoint: 'SubFamily',
            master: {
                name: 'familyId',
                onChange: (value) => {
                    return value ? {filter: [`parentId||$eq||${value}`]} : null
                } 
            }
        },
        {
            col: [12, 12, 12],
            name: 'description',
            label: 'Descripción'
        }
    ],
    repeaters: [ instrumentTypesRepiterForm.repeater ]
}