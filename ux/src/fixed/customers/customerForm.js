import { validator } from "../../../utility/formValidator/ValidationTypes"

export const CustomerForm = {
    structure: {
        addresses: [],
        contacts: [],
        documents: []
    },
    errors: {
        comercialName: { validations: [validator.isRequired] },
        email: { validations: [validator.isEmail] },
        CIF: { validations: [validator.isRequired] },
        idStatus: { validations: [validator.isRequired] },
        addresses: {
            address: { validations: [validator.isRequired] }
        },
        contacts: {
            name: { validations: [validator.isRequired] }
        }
    },
    autoincrement: 'customerCode',
    documents: true,
    base: [
        {
            col: [6, 2, 2],
            readonly: true,
            name: 'customerCode',
            label: 'Nº Cliente'
        },
        {
            col: [6, 4, 4],
            name: 'comercialName',
            label: 'Nombre'
        },
        {
            col: [6, 2, 2],
            name: 'CIF',
            label: 'C.I.F'
        },
        {
            col: [6, 4, 4],
            name: 'socialReason',
            label: 'Razón social'
        },
        {
            col: [6, 2, 2],
            name: 'phone',
            label: 'Teléfono'
        },
        {
            col: [6, 4, 4],
            type: 'email',
            name: 'email',
            label: 'E-mail'
        },
        {
            col: [6, 2, 2],
            name: 'idPaymentMethod',
            label: 'Forma de pago',
            endPoint: 'PaymentMethods'
        },
        {
            col: [6, 2, 2],
            name: 'idPayDay',
            label: 'Día de pago',
            endPoint: 'PayDay'
        },
        {
            col: [6, 2, 2],
            name: 'idCustomerOrigin',
            label: 'Origen',
            endPoint: 'Origin'
        },
        {
            col: [6, 2, 2],
            name: 'accountNumber',
            label: 'Número de cuenta'
        },
        {
            col: [6, 2, 2],
            name: 'idCustomerType',
            label: 'Tipo de cliente',
            endPoint: 'CustomerType'
        },
        {
            col: [6, 2, 2],
            name: 'idCustomerActivity',
            label: 'Actividad',
            endPoint: 'Activity'
        },
        {
            col: [6, 2, 2],
            name: 'idCustomerCategory',
            label: 'Categoría de cliente',
            endPoint: 'CustomerCategory'
        },
        {
            col: [6, 2, 2],
            name: 'idMode',
            label: 'Modo',
            endPoint: 'Mode'
        },
        {
            col: [6, 2, 2],
            name: 'idStatus',
            label: 'Estado',
            endPoint: 'Status'
        },
        {
            col: [6, 2, 2],
            name: 'idLanguage',
            label: 'Idioma',
            endPoint: 'Language'
        },
        {
            col: [12, 12, 12],
            area: true,
            name: 'observations',
            label: 'Observaciones'
        }
    ],
    repeaters: [
        {
            titulo: 'Direcciones',
            endPoint: 'addresses',
            structure: [
                {
                    addressType: '',
                    address: '',
                    population: '',
                    province: '',
                    postcode: ''
                }
            ],
            base: [
                {
                    col: [6, 2, 2],
                    name: 'addressType',
                    label: 'Tipo de dirección',
                    endPoint: 'AddressesTypes'
                },
                {
                    col: [6, 2, 2],
                    name: 'address',
                    label: 'Dirección'
                },
                {
                    col: [6, 2, 2],
                    name: 'population',
                    label: 'Población'
                },
                {
                    col: [6, 2, 2],
                    name: 'province',
                    label: 'Provincia'
                },
                {
                    col: [6, 2, 2],
                    name: 'postcode',
                    label: 'Código Postal'
                }
            ]
        },
        {
            titulo: 'Contactos',
            endPoint: 'contacts',
            structure: [
                {
                    name: '',
                    phone: '',
                    email: '',
                    charge: '',
                    startSchedule: '',
                    endSchedule: '',
                    department: ''
                }
            ],
            base: [
                {
                    col: [6, 3, 3],
                    name: 'name',
                    label: 'Nombre'
                },
                {
                    col: [6, 2, 2],
                    name: 'phone',
                    label: 'Teléfono'
                },
                {
                    col: [6, 3, 3],
                    name: 'email',
                    label: 'Correo'
                },
                {
                    col: [6, 2, 2],
                    name: 'charge',
                    label: 'Cargo'
                },
                {
                    col: [6, 3, 3],
                    name: 'startSchedule',
                    label: 'Horario inicio'
                },
                {
                    col: [6, 3, 3],
                    name: 'endSchedule',
                    label: 'Horario fin'
                },
                {
                    col: [6, 4, 4],
                    name: 'department',
                    label: 'Departamento',
                    endPoint: 'Departments'
                }

            ]
        }
    ]
}