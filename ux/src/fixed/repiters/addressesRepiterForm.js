import { validator } from "../../utility/formValidator/ValidationTypes"

export const addressesRepiterForm = {
    structure: [],
    errors: {
        address: { validations: [validator.isRequired] }
    },
    repeater: {
        titulo: 'Direcciones',
        endPoint: 'addresses',
        structure: [
            {
                isDefault: false
            }
        ],
        base: [
            {
                col: [1, 1, 1],
                name: 'isDefault',
                label: 'Principal',
                type: 'selectbutton',
                zone: 'addresses'
            },
            {
                col: [3, 3, 3],
                name: 'addressTypeId',
                label: 'Tipo dirección',
                endPoint: 'AddressType'
            },
            {
                col: [3, 3, 3],
                name: 'address',
                label: 'Direccion'
            },
            {
                col: [2, 2, 2],
                name: 'population',
                label: 'Población'
            },
            {
                col: [2, 2, 2],
                name: 'province',
                label: 'Provincia'
            },
            {
                col: [1, 1, 1],
                name: 'postCode',
                label: 'CP'
            }
        ]
    }
}