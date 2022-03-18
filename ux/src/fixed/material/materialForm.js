import { validator } from "../../utility/formValidator/ValidationTypes"

export const MaterialForm = {
    structure: {},
    errors: {
        name: { validations: [validator.isRequired] },
        lote: { validations: [validator.isRequired] },
        reference: { validations: [validator.isRequired] },
        gtin: { validations: [validator.isRequired] }
    },
    base: [
        {
            col: [1, 1, 1],
            readonly: true,
            name: 'id',
            label: 'Nº Material'
        },
        {
            col: [2, 2, 2],
            name: 'lote',
            label: 'Lote'
        },
        {
            col: [3, 3, 3],
            name: 'reference',
            label: 'Referencia'
        },
        {
            col: [2, 2, 2],
            name: 'weight',
            label: 'Peso'
        },
        {
            col: [2, 2, 2],
            name: 'expiration',
            label: 'Caducidad',
            type: 'date'
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
            col: [3, 3, 3],
            name: 'name',
            label: 'Nombre'
        },
        {
            col: [3, 3, 3],
            name: 'gtin',
            label: 'GTIN'
        },
        {
            col: [2, 2, 2],
            name: 'quantityGtin',
            label: 'Cantidad por GTIN'
        },
        {
            col: [2, 2, 2],
            name: 'stock',
            label: 'Stock'
        },
        {
            col: [2, 2, 2],
            name: 'minimumStock',
            label: 'Stock mínimo'
        },
        {
            col: [6, 6, 6],
            name: 'familyId',
            label: 'Familia',
            endPoint: 'Family'
        },
        {
            col: [6, 6, 6],
            name: 'subFamilyId',
            label: 'Subfamilia',
            endPoint: 'SubFamily',
            master: {
                name: 'familyId',
                onChange: (value) => {
                    return value ? {filter: [`parentId||$eq||${value}`]} : null
                } 
            }
        },
        {
            col: [12, 12, 12],
            name: 'description',
            label: 'Descripción'
        }
    ]
}