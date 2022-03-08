import { validator } from "../../../utility/formValidator/ValidationTypes"

export const IncidenceReasonForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [12, 12, 12],
            name: 'name',
            label: 'Motivo de incidencia'
        }
    ]
}