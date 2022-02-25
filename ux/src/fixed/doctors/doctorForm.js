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
            col: [6, 2, 2],
            readonly: true,
            name: 'id',
            label: 'Nº Doctor'
        },
        {
            col: [6, 5, 5],
            name: 'name',
            label: 'Nombre'
        },
        {
            col: [6, 5, 5],
            name: 'fullName',
            label: 'Nombre completo'
        },
        {
            col: [6, 2, 2],
            name: 'status',
            label: 'Estado',
            endPoint: 'Status',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        },
        {
            col: [6, 2, 2],
            name: 'mode',
            label: 'Modo',
            endPoint: 'Mode',
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