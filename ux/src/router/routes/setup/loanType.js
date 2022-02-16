import { LoanTypeForm } from '../../../fixed/loanType/loanTypeForm'
import { LoanTypeList } from '../../../fixed/loanType/loanTypeList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Organización de ventas',
    endPoint: 'SalesOrg',
    list: {
        columns: LoanTypeList
    },
    form: {
        form: LoanTypeForm
    }
}
const LoanTypeRoutes = [
    {
        path: '/setup/loans/loan-type',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'customers'
        }
    },
    {
        path: '/setup/loans/loan-type/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'customers'
        }
    },
    {
        path: '/setup/loans/loan-type/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'customers'
        }
    }
]

export default LoanTypeRoutes
