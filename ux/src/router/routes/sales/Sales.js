import { SaleForm } from '../../../fixed/sale/saleForm'
import { SaleList } from '../../../fixed/sale/saleList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Ventas',
    endPoint: 'Sales',
    list: {
        columns: SaleList
    },
    form: {
        form: SaleForm
    }
}
const SalesRoutes = [
    {
        path: '/sales',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'sales'
        }
    },
    {
        path: '/sales/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'sales'
        }
    },
    {
        path: '/sales/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'sales'
        }
    }
]

export default SalesRoutes
