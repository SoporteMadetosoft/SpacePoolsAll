import { validator } from "../../../utility/formValidator/ValidationTypes"

export const ZoneForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 6, 6],
            name: 'name',
            label: 'Zona'
        }//TODO
        //,
        // {
        //     col: [4, 4, 4],
        //     name: 'province',
        //     label: 'Provincias',
        //     endPoint: 'Province',
        //     multi: true,
        //     customOptions: [
        //         {value: 1, label: "asdf"},
        //         {value: 2, label: "asdf"}
        //     ]
        // }
    ]
}