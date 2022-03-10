import { DeliveryForm } from '../../../fixed/delivery/deliveryForm'
import { DeliveryList } from '../../../fixed/delivery/deliveryList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Albaranes',
    endPoint: 'Delivery',
    list: {
        columns: DeliveryList
    },
    form: {
        form: DeliveryForm
    }
}
const DeliverysRoutes = [
    {
        path: '/delivery',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'delivery'
        }
    },
    {
        path: '/delivery/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'delivery'
        }
    },
    {
        path: '/delivery/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'delivery'
        }
    }
]

export default DeliverysRoutes
