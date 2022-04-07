import { validator } from "../../utility/formValidator/ValidationTypes"

export const contactsRepiterForm = {
    structure: [],
    errors: {
        contactName: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Contactos',
        endPoint: 'contacts',
        structure: [
            {
                mainContact: false
            }
        ],
        base: [
            {
                col: [1, 1, 1],
                name: 'mainContact',
                label: 'Principal',
                type: 'selectbutton',
                zone: 'contacts'
            },
            {
                col: [4, 4, 4],
                name: 'contactName',
                label: 'Nombre persona de contacto'
            },
            {
                col: [2, 2, 2],
                name: 'phone',
                label: 'Teléfono'
            },
            {
                col: [3, 3, 3],
                name: 'email',
                label: 'Correo electrónico'
            },
            {
                col: [2, 2, 2],
                name: 'startTimeContact',
                label: 'Horario de contacto inicio',
                type: 'time'
            },
            {
                col: [5, 5, 5],
                name: 'businessPosition',
                label: 'Cargo'
            },
            {
                col: [5, 5, 5],
                name: 'departmentId',
                label: 'Departamento',
                endPoint: 'Department'
            },
            {
                col: [2, 2, 2],
                name: 'endTimeContact',
                label: 'Horario de contacto fin',
                type: 'time'
            }
        ]
    }
}