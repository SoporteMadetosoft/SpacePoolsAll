import { validator } from "../../utility/formValidator/ValidationTypes"

export const SheetForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº Sheet'
        },
        {
            col: [7, 7, 7],
            name: 'name',
            label: 'Nombre'
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
            col: [12, 12, 12],
            name: 'observations',
            label: 'Observaciones'
        }
    ]
}