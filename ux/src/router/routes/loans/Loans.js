import { LoanForm } from '../../../fixed/loan/loanForm'
import { LoanList } from '../../../fixed/loan/loanList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Préstamos',
    endPoint: 'Loans',
    list: {
        columns: LoanList
    },
    form: {
        form: LoanForm
    }
}
const LoansRoutes = [
    {
        path: '/loans',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'loans'
        }
    },
    {
        path: '/loans/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'loans'
        }
    },
    {
        path: '/loans/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'loans'
        }
    }
]

export default LoansRoutes
