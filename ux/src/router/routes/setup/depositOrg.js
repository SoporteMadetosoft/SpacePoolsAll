import { DepositOrgForm } from '../../../fixed/depositOrg/depositOrgForm'
import { DepositOrgList } from '../../../fixed/depositOrg/depositOrgList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Organización de depósitos',
    endPoint: 'DepositOrg',
    list: {
        columns: DepositOrgList
    },
    form: {
        form: DepositOrgForm
    }
}
const DepositOrgRoutes = [
    {
        path: '/setup/centers/deposit-org',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'depositOrg'
        }
    },
    {
        path: '/setup/centers/deposit-org/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'depositOrg'
        }
    },
    {
        path: '/setup/centers/deposit-org/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'depositOrg'
        }
    }
]

export default DepositOrgRoutes
