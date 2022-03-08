import { validator } from "../../../utility/formValidator/ValidationTypes"

export const FamilyForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 6, 6],
            name: 'name',
            label: 'Familia'
        },
        {
            col: [6, 6, 6],
            name: 'parentId',
            label: 'Padre',
            endPoint: 'Family'
        }
    ]
}