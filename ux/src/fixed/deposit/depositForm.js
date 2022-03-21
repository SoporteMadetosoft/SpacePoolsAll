import { validator } from "../../utility/formValidator/ValidationTypes"

export const DepositForm = {
    structure: {},
    errors: {
        centerId: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº depósito'
        },
        {
            col: [5, 5, 5],
            name: 'centerId',
            label: 'Centro',
            endPoint: 'Centers'
        },
        {
            col: [2, 2, 2],
            name: 'deliveryDay',
            label: 'Dia de entrega',
            type: "date"
        },
        {
            col: [2, 2, 2],
            name: 'collectionDay',
            label: 'Dia de recogida',
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
        }
    ]
}