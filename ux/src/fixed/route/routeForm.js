import { validator } from "../../utility/formValidator/ValidationTypes"

export const RouteForm = {
    structure: {
        documents: []
    },
    errors: {
        name: { validations: [validator.isRequired] }
    },
    documents: true,
    base: [
        {
            col: [6, 2, 2],
            readonly: true,
            name: 'id',
            label: 'Nº Route'
        },
        {
            col: [6, 6, 6],
            name: 'name',
            label: 'Nombre'
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