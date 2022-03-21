import { validator } from "../../utility/formValidator/ValidationTypes"

export const LoanForm = {
    structure: {},
    errors: {
        customer: { validations: [validator.isRequired] },
        startDay: { validations: [validator.isRequired] },
        endDay: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº Préstamo'
        },
        {
            col: [5, 5, 5],
            name: 'reference',
            label: 'Referencia'
        },
        {
            col: [4, 4, 4],
            name: 'serialNum',
            label: 'Nº de serie'
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
            name: 'loanTypeId',
            label: 'Motivo de préstamo',
            endPoint: 'LoanType'
        },
        {
            col: [3, 3, 3],
            name: 'startDay',
            label: 'Día de adquisición',
            type: "date"
        },
        {
            col: [3, 3, 3],
            name: 'endDay',
            label: 'Día de baja',
            type: "date"
        },
        {
            col: [6, 6, 6],
            name: 'centerId',
            label: 'Centro',
            endPoint: 'Centers'
        },
        {
            col: [6, 6, 6],
            name: 'customer',
            label: 'Ubicación',
            endPoint: 'Customer'
        }
    ]
}