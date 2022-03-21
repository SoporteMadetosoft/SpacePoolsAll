import { validator } from "../../utility/formValidator/ValidationTypes"

export const UserForm = {
    structure: {},
    errors: {
        fullName: { validations: [validator.isRequired] },
        login: { validations: [validator.isRequired] },
        phone: { validations: [validator.isRequired] },
        email: { validations: [validator.isEmail] },
        roleId: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 3, 3],
            name: 'fullName',
            label: 'Nombre'
        },
        {
            col: [6, 3, 3],
            name: 'login',
            label: 'Login'
        },
        {
            col: [6, 3, 3],
            type: 'email',
            name: 'email',
            label: 'E-mail'
        },
        {
            col: [6, 3, 3],
            name: 'phone',
            label: 'Teléfono'
        },
        {
            col: [6, 6, 6],
            type: 'password',
            name: 'password',
            label: 'Contraseña'
        },
        {
            col: [6, 3, 3],
            name: 'roleId',
            label: 'Rol',
            endPoint: 'Roles'
        },
        {
            col: [6, 3, 3],
            name: 'status',
            label: 'Estado',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        }
    ]
}