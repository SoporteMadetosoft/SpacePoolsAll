import { validator } from "../../../utility/formValidator/ValidationTypes"

export const AddressTypeForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [12, 12, 12],
            name: 'name',
            label: 'Tipo de dirección'
        }
    ]
}