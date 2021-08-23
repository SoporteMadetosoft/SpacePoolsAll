
import { Radio } from "@cc/form/form-elements/Radio"
import { Input } from "@cc/form/form-elements/Input"
import { Select } from "@cc/form/form-elements/Select"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookUser as user } from '@fortawesome/pro-regular-svg-icons'
import { faBookUser as activeUser } from '@fortawesome/pro-solid-svg-icons'

export const contactsForm = {
    idGroup: 'contactPersons',
    title: 'Contactos',
    form: [
        {
            Component: Radio,
            field_type: 'checkbox',
            field_id: 'contactPersons-defaultContact',
            field_radio_group: 'contactPersons-defaultContact',
            field_name: 'contactPersons-defaultContact',
            field_label: 'Principal',
            field_placeholder: 'Principal'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-name',
            field_name: 'contactPersons-name',
            field_label: 'Nombre del Contacto',
            field_placeholder: 'Nombre del Contacto',
            field_className: 'form-control',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-phone',
            field_name: 'contactPersons-phone',
            field_label: 'Teléfono',
            field_placeholder: 'Teléfono',
            field_className: 'form-control',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'email',
            field_id: 'contactPersons-email',
            field_name: 'contactPersons-email',
            field_label: 'Correo electrónico',
            field_placeholder: 'Correo electrónico',
            field_className: 'form-control',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'text',
            field_id: 'contactPersons-charge',
            field_name: 'contactPersons-charge',
            field_label: 'Cargo',
            field_placeholder: 'Cargo',
            field_className: 'form-control',
            block_className: 'col-md-2'
        },
        {
            Component: Input,
            field_type: 'text',
            field_label: 'Horario de contacto',
            field_id: 'contactPersons-schedule',
            field_name: 'contactPersons-schedule',
            field_placeholder: 'Horario de contacto',
            field_className: 'form-control',
            block_className: 'col-md-2'
        }

    ]
}