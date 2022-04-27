import { validator } from "../../utility/formValidator/ValidationTypes"
import { RolesForm } from "../../views/roles/rolesForm/RolesForm"

export const RoleForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] },
        roleZone: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [6, 3, 3],
            name: 'name',
            label: 'Nombre'
        },
        {
            col: [3, 3, 3],
            name: 'tipo',
            label: 'Tipo de usuario',
            customOptions: [
                { value: true, label: 'Comercial' },
                { value: false, label: 'Usuario' }
            ]
        },
        {
            col: [3, 3, 3],
            name: 'roleZone',
            label: 'Zona',
            endPoint: 'Zone'
        },
        {
            col: [12, 12, 12],
            name: 'permisos',
            label: 'Permisos',
            component: RolesForm
        }
    ]
}