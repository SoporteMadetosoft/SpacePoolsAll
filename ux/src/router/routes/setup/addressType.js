import { AddressTypeForm } from '../../../fixed/addressType/addressTypeForm'
import { AddressTypeList } from '../../../fixed/addressType/addressTypeList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Tipos de dirección',
    endPoint: 'AddressType',
    list: {
        columns: AddressTypeList
    },
    form: {
        form: AddressTypeForm
    }
}
const AddressTypeRoutes = [
    {
        path: '/setup/general/address-type',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'addressType'
        }
    },
    {
        path: '/setup/general/address-type/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'addressType'
        }
    },
    {
        path: '/setup/general/address-type/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'addressType'
        }
    }
]

export default AddressTypeRoutes
