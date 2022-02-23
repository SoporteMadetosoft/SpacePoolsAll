<<<<<<< HEAD
import { SalesOrgForm } from '../../../fixed/setup/salesOrg/salesOrgForm'
import { SalesOrgList } from '../../../fixed/setup/salesOrg/salesOrgList'
=======
import { SalesOrgForm } from '../../../fixed/salesOrg/salesOrgForm'
import { SalesOrgList } from '../../../fixed/salesOrg/salesOrgList'
>>>>>>> 710498fa0e745d4ad55e02b9f89ae58e86b613b9
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Organización de ventas',
    endPoint: 'SalesOrg',
    list: {
        columns: SalesOrgList
    },
    form: {
        form: SalesOrgForm
    }
}
const SalesOrgRoutes = [
    {
        path: '/setup/centers/sales-org',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'salesOrg'
        }
    },
    {
        path: '/setup/centers/sales-org/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'salesOrg'
        }
    },
    {
        path: '/setup/centers/sales-org/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'salesOrg'
        }
    }
]

export default SalesOrgRoutes
