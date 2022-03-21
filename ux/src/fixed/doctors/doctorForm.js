import { validator } from "../../utility/formValidator/ValidationTypes"

export const DoctorForm = {
    structure: {
        documents: []
    },
    errors: {
        name: { validations: [validator.isRequired] },
        fullName: { validations: [validator.isRequired] }
    },
    documents: true,
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº Doctor'
        },
        {
            col: [2, 2, 2],
            name: 'name',
            label: 'Nombre doctor'
        },
        {
            col: [5, 5, 5],
            name: 'fullName',
            label: 'Nombre completo'
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
            col: [2, 2, 2],
            name: 'mode',
            label: 'Modo',
            customOptions: [
                { value: true, label: 'Bloqueado' },
                { value: false, label: 'No bloqueado' }
            ]
        },
        {
            col: [12, 12, 12],
            name: 'observations',
            label: 'Observaciones'
        }
    ]
}