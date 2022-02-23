import { validator } from "../../utility/formValidator/ValidationTypes"

export const FamilyForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 4, 4],
            name: 'name',
            label: 'Familia'
        },
        {
            col: [6, 4, 4],
            name: 'parent',
            label: 'Padre',
            endPoint: 'Family'
        }
    ]
}