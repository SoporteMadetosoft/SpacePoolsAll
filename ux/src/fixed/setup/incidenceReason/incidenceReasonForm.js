import { validator } from "../../../utility/formValidator/ValidationTypes"

export const IncidenceReasonForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 4, 4],
            name: 'name',
            label: 'Motivo de incidencia'
        }
    ]
}