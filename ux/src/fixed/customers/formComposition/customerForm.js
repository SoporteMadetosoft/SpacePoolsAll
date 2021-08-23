import { Input }  from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"
import { TextArea } from "@cc/form/form-elements/TextArea"


export const customerForm = [
 
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Nº cliente',
        field_id: 'customerCode',
        field_name: 'customerCode',
        field_placeholder: 'Número cliente',
        field_className: 'form-control',
        block_className: 'col-md-1',
        required: true
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Nombre',
        field_id: 'comercialName',
        field_name: 'comercialName',
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
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Razón social',
        field_id: 'socialReason',
        field_name: 'socialReason',
        field_placeholder: 'Razón social',
        field_className: 'form-control',
        block_className: 'col-md-4'
    },
    
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Número Comercial',
        field_id: 'comercialNum',
        field_name: 'comercialNum',
        field_placeholder: 'Número Comercial',
        field_className: 'form-control',
        block_className: 'col-md-2'
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
        field_label: 'E-mail',
        field_id: 'email',
        field_name: 'email',
        field_placeholder: 'E-mail',
        field_className: 'form-control',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Forma de pago',
        field_id: 'idPaymentMethod',
        field_name: 'idPaymentMethod',
        field_placeholder: 'Forma de pago',
        field_options: 'paymentMethodsReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Día de pago',
        field_id: 'payDay',
        field_name: 'payDay',
        field_placeholder: 'Día de pago',
        field_options: 'paydayReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Número de cuenta',
        field_id: 'accountNumber',
        field_name: 'accountNumber',
        field_placeholder: 'Número de cuenta',
        field_className: 'form-control',
        block_className: 'col-md-4'
    },
    
    
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Tipo de cliente',
        field_id: 'idCustomerType',
        field_name: 'idCustomerType',
        field_placeholder: 'Tipo de cliente',
        field_options: 'customerTypeReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Categoría de cliente',
        field_id: 'idCustomerCategory',
        field_name: 'idCustomerCategory',
        field_placeholder: 'Categoría de cliente',
        field_options: 'customerCategoryReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Actividad',
        field_id: 'idCustomerActivity',
        field_name: 'idCustomerActivity',
        field_placeholder: 'Actividad',
        field_options: 'activitiesReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Origen',
        field_id: 'idCustomerOrigin',
        field_name: 'idCustomerOrigin',
        field_placeholder: 'Origen',
        field_options: 'originReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_label: 'Modo',
        field_id: 'mode',
        field_name: 'mode',
        field_placeholder: 'Modo',
        field_options: 'modeReducer',
        field_className: '',
        block_className: 'col-md-2'
    },

    {
        Component: Select,
        field_label: 'Estado',
        field_id: 'status',
        field_name: 'status',
        field_placeholder: 'Estado',
        field_options: 'statusReducer',
        field_className: '',
        block_className: 'col-md-2'
    },
    {
        Component: Select,
        field_label: 'Idioma',
        field_id: 'idLanguage',
        field_name: 'idLanguage',
        field_placeholder: 'Idioma',
        field_options: 'languagesReducer',
        field_className: '',
        block_className: 'col-md-2'
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

