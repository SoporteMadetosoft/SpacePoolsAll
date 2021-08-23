import { Input } from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"

export const modelForm = [
    {
        Component: Input,
        field_type: 'text',
        field_label: 'Modelo',
        field_id: 'name',
        field_name: 'name',
        field_placeholder: 'Modelo',
        field_className: 'form-control',
        block_className: 'col-md-3 mt-1',
        required: true
    },
    {
        Component: Select,
        field_type: 'number',
        field_label: 'Marca',
        field_id: 'brand',
        field_name: 'brand',
        field_placeholder: 'Modelo',
        field_options: 'brandsReducer',
        field_className: '',
        block_className: 'col-md-3 mt-1',
        required: true
    }
]

