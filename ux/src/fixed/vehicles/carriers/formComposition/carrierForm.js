import { Input }  from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"
import { TextArea } from "@cc/form/form-elements/TextArea"


export const carrierForm = [
 
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Nº transportista',
        field_id: 'carrierCode',
        field_name: 'carrierCode',
        field_placeholder: 'Nº transportista',
        field_className: 'form-control',
        block_className: 'col-md-2',
        required: true
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Nombre',
        field_id: 'name',
        field_name: 'name',
        field_placeholder: 'Nombre',
        field_className: 'form-control',
        block_className: 'col-md-4'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'DNI / NIF',
        field_id: 'NIF',
        field_name: 'NIF',
        field_placeholder: 'DNI / NIF',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'E-mail',
        field_id: 'email',
        field_name: 'email',
        field_placeholder: 'E-mail',
        field_className: 'form-control',
        block_className: 'col-md-4'
    },
    
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Teléfono',
        field_id: 'phone',
        field_name: 'phone',
        field_placeholder: 'Teléfono',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Móvil',
        field_id: 'phone2',
        field_name: 'phone2',
        field_placeholder: 'Móvil',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'text',
        field_label: 'País',
        field_id: 'country',
        field_name: 'country',
        field_placeholder: 'País',
        field_options: 'paymentMethodsReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Provincia',
        field_id: 'state',
        field_name: 'state',
        field_placeholder: 'Provincia',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Ciudad',
        field_id: 'city',
        field_name: 'city',
        field_placeholder: 'Ciudad',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Dirección',
        field_id: 'address',
        field_name: 'address',
        field_placeholder: 'Dirección',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Código postal',
        field_id: 'postcode',
        field_name: 'postcode',
        field_placeholder: 'Código postal',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Estado',
        field_id: 'status',
        field_name: 'status',
        field_placeholder: 'Estado',
        field_options: 'statusReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'time',
        field_label: 'Inicio de contacto',
        field_id: 'startSchedule',
        field_name: 'startSchedule',
        field_placeholder: 'Inicio de contacto',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'time',
        field_label: 'Fin de contacto',
        field_id: 'endSchedule',
        field_name: 'endSchedule',
        field_placeholder: 'Fin de contacto',
        field_className: 'form-control',
        block_className: 'col-md-2'
    }
    
]

