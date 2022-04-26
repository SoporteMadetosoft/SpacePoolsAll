import { validator } from "../../utility/formValidator/ValidationTypes"

export const materialRepiterForm = {
    structure: [],
    errors: {
        materialId: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Materiales',
        endPoint: 'instrumentalMaterial',
        structure: [{}],
        base: [
            {
                col: [5, 5, 5],
                name: 'materialId',
                label: 'Material',
                endPoint: 'Materials',
                labelName: 'reference'
            },
            {
                col: [5, 5, 5],
                name: 'amount',
                label: 'Cantidad'
            }
        ]
    }
}