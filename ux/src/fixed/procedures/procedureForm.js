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
            readOnly: true,
            name: 'id',
            label: 'Nº Procedimiento'
        },
        {
            col: [6, 5, 5],
            name: 'name',
            label: 'Nombre Procedimiento'
        },
        {
            col: [6, 5, 5],
            name: 'familyId',
            label: 'Familia del procedimiento',
            endPoint: 'ProcedureFamily'
        }
    ]
}