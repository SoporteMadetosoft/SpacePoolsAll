import { validator } from "../../utility/formValidator/ValidationTypes"

export const ProcedureForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] },
        familyId: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 2, 2],
            readonly: true,
            name: 'id',
            label: 'Nº Procedimiento'
        },
        {
            col: [6, 5, 5],
            name: 'name',
            label: 'Nombre'
        },
        {
            col: [6, 5, 5],
            name: 'fullName',
            label: 'Familia',
            endPoint: 'ProcedureFamily'
        }
    ]
}