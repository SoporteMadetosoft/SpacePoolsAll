import { validator } from "../../utility/formValidator/ValidationTypes"

export const SaleForm = {
    structure: {},
    errors: {
        centerId: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readonly: true,
            name: 'id',
            label: 'Nº Venta'
        },
        {
            col: [7, 7, 7],
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