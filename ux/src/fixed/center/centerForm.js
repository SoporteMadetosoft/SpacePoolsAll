import { validator } from "../../utility/formValidator/ValidationTypes"
import { addressesRepiterForm } from "../repiters/addressesRepiterForm"
import { contactsRepiterForm } from "../repiters/contactsRepiterForm"

export const CenterForm = {
    structure: {
        addresses: addressesRepiterForm.structure,
        contacts: contactsRepiterForm.structure
    },
    errors: {
        name: { validations: [validator.isRequired] },
        code: { validations: [validator.isRequired] },
        oracleNumber: { validations: [validator.isRequired] },
        cif: { validations: [validator.isRequired] },
        addresses: addressesRepiterForm.errors,
        contacts: contactsRepiterForm.errors
    },
    base: [
        {
            col: [1, 1, 1],
            readOnly: true,
            name: 'id',
            label: 'Nº Centro'
        },
        {
            col: [4, 4, 4],
            name: 'name',
            label: 'Nombre centro'
        },
        {
            col: [2, 2, 2],
            name: 'status',
            label: 'Estado',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        },
        {
            col: [2, 2, 2],
            name: 'mode',
            label: 'Modo',
            customOptions: [
                { value: true, label: 'Bloqueado' },
                { value: false, label: 'No bloqueado' }
            ]
        },
        {
            col: [3, 3, 3],
            name: 'oracleNumber',
            label: 'Nº Centro de oracle'
        },
        {
            col: [2, 2, 2],
            name: 'code',
            label: 'Código centro'
        },
        {
            col: [2, 2, 2],
            name: 'cif',
            label: 'CIF'
        },
        {
            col: [2, 2, 2],
            name: 'socialReason',
            label: 'Razón social'
        },
        {
            col: [2, 2, 2],
            name: 'phone',
            label: 'Teléfono'
        },
        {
            col: [4, 4, 4],
            name: 'email',
            label: 'Correo electrónico'
        },
        {
            col: [4, 4, 4],
            name: 'salesOrgId',
            label: 'Organizacion de ventas',
            endPoint: 'SalesOrg'
        },
        {
            col: [4, 4, 4],
            name: 'conditionalOrgId',
            label: 'Organizacion condicionales',
            endPoint: 'ConditionalOrg'
        },
        {
            col: [4, 4, 4],
            name: 'depositsOrgId',
            label: 'Organizacion de depositos',
            endPoint: 'DepositOrg'
        },
        {
            col: [4, 4, 4],
            name: 'salesSubInventory',
            label: 'Subinventario de ventas'
        },
        {
            col: [4, 4, 4],
            name: 'conditionalSubInventory',
            label: 'Subinventario condicionales'
        },
        {
            col: [4, 4, 4],
            name: 'depositSubInventory',
            label: 'Subinventario de depositos'
        },
        {
            col: [12, 12, 12],
            name: 'observations',
            label: 'Observaciones'
        }
    ],
    repeaters: [
        addressesRepiterForm.repeater,
        contactsRepiterForm.repeater
    ]
}