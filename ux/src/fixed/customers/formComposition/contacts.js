import { Checkbox, Radio } from "@cc/form/form-elements/Radio"
import { Input } from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"
import { Button } from "bootstrap"

export const contacts = {
    idGroup: 'contactPersons',
    title: 'Personas de contacto',
    form: [
        {
            Component: Radio,
            field_type: 'checkbox',
            field_id: 'contactPersons-mainContact',
            field_radio_group: 'contactPersons-mainContact',
            field_name: 'contactPersons-mainContact',
            field_label: 'Contacto Principal',
            field_placeholder: 'Contacto Principal',
            block_className: 'col-md-1'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-name',
            field_name: 'contactPersons-name',
            field_label: 'Nombre persona de contacto',
            field_placeholder: 'Nombre',
            field_className: 'form-control',
            block_className: 'col-md-5'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-phone',
            field_name: 'contactPersons-phone',
            field_label: 'Teléfono',
            field_placeholder: 'Teléfono',
            field_className: 'form-control',
            block_className: 'col-md-3'
           
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-email',
            field_name: 'contactPersons-email',
            field_label: 'Correo electrónico',
            field_placeholder: 'Correo electrónico',
            field_className: 'form-control',
            block_className: 'col-md-3'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-charge',
            field_name: 'contactPersons-charge',
            field_label: 'Cargo',
            field_placeholder: 'Cargo',
            field_className: 'form-control',
            block_className: 'col-md-3'
        },
        {
            Component: Input,
            field_type: 'time',
            field_label: 'Inicio de contacto',
            field_id: 'contactPersons-startSchedule',
            field_name: 'contactPersons-startSchedule',
            field_placeholder: 'Inicio de contacto',
            field_className: 'form-control',
            block_className: 'col-md-3'
        },
        {
            Component: Input,
            field_type: 'time',
            field_label: 'Final de contacto',
            field_id: 'contactPersons-endSchedule',
            field_name: 'contactPersons-endSchedule',
            field_placeholder: 'Final de contacto',
            field_className: 'form-control',
            block_className: 'col-md-3'
        },
        {
            Component: Select,
            field_type: 'text',
            field_id: 'contactPersons-department',
            field_name: 'contactPersons-department',
            field_label: 'Departamento',
            field_placeholder: 'Departamento',
            field_options: 'departmentsReducer',
            block_className: 'col-md-3'
        }
    ]
}