import { Input } from "@cc/form/form-elements/Input"

export const paymentMethodForm = [
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Método de pago',
        field_id: 'name',
        field_name: 'name',
        field_placeholder: 'Método de pago',
        field_className: 'form-control',
        block_className: 'col-md-3 mt-1',
        required: true
    },
    {
        Component: Input,
        field_type: 'number',
        field_label: 'Valor en días',
        field_id: 'value',
        field_name: 'value',
        field_placeholder: 'Valor en días',
        field_className: 'form-control',
        block_className: 'col-md-3 mt-1',
        required: true
    }
]

