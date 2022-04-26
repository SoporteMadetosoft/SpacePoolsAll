import { validator } from "../../utility/formValidator/ValidationTypes"
import { instrumentTypeRepiterForm } from "../repiters/instrumentTypeRepiterForm"
import { materialRepiterForm } from "../repiters/materialRepiterForm"

export const InstrumentalForm = {
    structure: {
        instrumentalInstrumentType: instrumentTypeRepiterForm.structure,
        instrumentalMaterial: materialRepiterForm.structure
    },
    errors: {
        gtin: { validations: [validator.isRequired] },
        instrumentalInstrumentType: instrumentTypeRepiterForm.errors,
        instrumentalMaterial: materialRepiterForm.errors
    },
    base: [
        {
            col: [4, 4, 4],
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
                    return value ? { filter: [`parentId||$eq||${value}`] } : null
                }
            }
        },
        {
            col: [12, 12, 12],
            name: 'description',
            type: 'area',
            label: 'Descripción'
        }
    ],
    repeaters: [
        instrumentTypeRepiterForm.repeater,
        materialRepiterForm.repeater
    ]
}