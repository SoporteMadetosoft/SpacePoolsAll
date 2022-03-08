import { validator } from "../../../utility/formValidator/ValidationTypes"

export const SalesOrgForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [12, 12, 12],
            name: 'name',
            label: 'Organización de ventas'
        }
    ]
}