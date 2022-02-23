import { validator } from "../../../utility/formValidator/ValidationTypes"

export const SalesOrgForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 4, 4],
            name: 'name',
            label: 'Organización de ventas'
        }
    ]
}