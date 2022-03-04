import { validator } from "../../utility/formValidator/ValidationTypes"

export const CenterForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readonly: true,
            name: 'id',
            label: 'Nº Centro'
        },
        {
            col: [5, 5, 5],
            name: 'name',
            label: 'Nombre centro'
        },
        {
            col: [2, 2, 2],
            name: 'status',
            label: 'Estado',
            endPoint: 'Status',
            customOptions: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]
        },
        {
            col: [2, 2, 2],
            name: 'mode',
            label: 'Modo',
            endPoint: 'Mode',
            customOptions: [
                { value: true, label: 'Bloqueado' },
                { value: false, label: 'No bloqueado' }
            ]
        },
        {
            col: [2, 2, 2],
            name: 'code',
            label: 'Código centro'
        },
        {
            col: [2, 2, 2],
            name: 'oracleNumber',
            label: 'Nº Centro de oracle'
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
            endPoint: 'SalesOrgId'
        },
        {
            col: [4, 4, 4],
            name: 'conditionalOrgId',
            label: 'Organizacion condicionales',
            endPoint: 'ConditionalOrgId'
        },
        {
            col: [4, 4, 4],
            name: 'depositsOrgId',
            label: 'Organizacion de depositos',
            endPoint: 'DepositsOrgId'
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
    ]
}