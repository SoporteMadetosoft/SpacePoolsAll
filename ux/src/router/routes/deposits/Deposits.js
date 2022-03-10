import { DepositForm } from '../../../fixed/deposit/depositForm'
import { DepositList } from '../../../fixed/deposit/depositList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Deposites',
    endPoint: 'Deposits',
    list: {
        columns: DepositList
    },
    form: {
        form: DepositForm
    }
}
const DepositsRoutes = [
    {
        path: '/deposits',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'deposits'
        }
    },
    {
        path: '/deposits/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'deposits'
        }
    },
    {
        path: '/deposits/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'deposits'
        }
    }
]

export default DepositsRoutes
