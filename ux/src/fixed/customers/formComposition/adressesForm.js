
import { Checkbox, Radio } from "@cc/form/form-elements/Radio"
import { Input } from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"
import { Button } from "bootstrap"

export const addressesForm = {
    idGroup: 'addresses',
    title: 'Direcciones',
    form: [
        {
            Component: Radio,
            field_type: 'checkbox',
            field_id: 'addresses-defaultAddress',
            field_radio_group: 'addresses-defaultAddress',
            field_name: 'addresses-default',
            field_label: 'Principal',
            field_placeholder: 'Nombre',
            block_className: 'col-md-1'
        },
        {
            Component: Select,
            field_type: 'text',
            field_id: 'addresses-addressType',
            field_name: 'addresses-addressType',
            field_label: 'Tipo de direccion',
            field_placeholder: 'Elige algun tipo',
            field_options: 'addressesTypesReducer',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'addresses-address',
            field_name: 'addresses-address',
            field_label: 'Dirección',
            field_placeholder: 'Dirección',
            field_className: 'form-control',
            block_className: 'col-md-3'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'addresses-population',
            field_name: 'addresses-population',
            field_label: 'Población',
            field_placeholder: 'Población',
            field_className: 'form-control',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'addresses-province',
            field_name: 'addresses-province',
            field_label: 'Provincia',
            field_placeholder: 'Provincia',
            field_className: 'form-control',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'addresses-postcode',
            field_name: 'addresses-postcode',
            field_label: 'Código Postal',
            field_placeholder: 'Código Postal',
            field_className: 'form-control',
            block_className: 'col-md-2'
        }
    ]
}