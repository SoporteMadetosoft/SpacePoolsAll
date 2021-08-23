import { Input }  from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"
import { TextArea } from "@cc/form/form-elements/TextArea"

export const vendorsForm = [
  
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Nombre',
        field_id: 'name',
        field_name: 'name',
        field_placeholder: 'Nombre',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'C.I.F.',
        field_id: 'CIF',
        field_name: 'CIF',
        field_placeholder: 'C.I.F.',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Razón social',
        field_id: 'businessName',
        field_name: 'businessName',
        field_placeholder: 'Razón social',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Teléfono',
        field_id: 'phone',
        field_name: 'phone',
        field_placeholder: 'Telefono',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'E-mail',
        field_id: 'email',
        field_name: 'email',
        field_placeholder: 'E-mail',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Formas de pago',
        field_id: 'idPaymentMethod',
        field_name: 'idPaymentMethod',
        field_placeholder: 'Formas de pago',
        field_options: 'paymentMethodsReducer',
        field_className: '',
        block_className: 'col-md-3'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Tipo de proveedor',
        field_id: 'idVendorType',
        field_name: 'idVendorType',
        field_placeholder: 'Tipo de proveedor',
        field_options:  'vendorTypeReducer',
        field_className: '',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'time',
        field_label: 'Hora de recogida',
        field_id: 'pickupTime',
        field_name: 'pickupTime',
        field_placeholder: 'Hora de recogida',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Select,
        field_label: 'Estado',
        field_id: 'idStatus',
        field_name: 'idStatus',
        field_placeholder: 'Estado',
        field_options: 'statusReducer',
        field_className: '',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Código productor',
        field_id: 'producerCode',
        field_name: 'producerCode',
        field_placeholder: 'Código productor',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Código gestor',
        field_id: 'managerCode',
        field_name: 'managerCode',
        field_placeholder: 'Código gestor',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'NIMA',
        field_id: 'NIMA',
        field_name: 'NIMA',
        field_placeholder: 'NIMA',
        field_className: 'form-control',
        block_className: 'col-md-3'
    },
    {
        Component: TextArea,
        field_type: 'textarea',
        field_label: 'Observaciones',
        field_id: 'observations',
        field_name: 'observations',
        field_placeholder: 'Observaciones',
        field_className: 'form-control',
        block_className: 'col-md-12'
    }
]
