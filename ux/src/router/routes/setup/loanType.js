<<<<<<< HEAD
import { LoanTypeForm } from '../../../fixed/setup/loanType/loanTypeForm'
import { LoanTypeList } from '../../../fixed/setup/loanType/loanTypeList'
=======
import { LoanTypeForm } from '../../../fixed/loanType/loanTypeForm'
import { LoanTypeList } from '../../../fixed/loanType/loanTypeList'
>>>>>>> 710498fa0e745d4ad55e02b9f89ae58e86b613b9
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Tipos de préstamo',
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
            resource: 'loanType'
        }
    },
    {
        path: '/setup/loans/loan-type/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'loanType'
        }
    },
    {
        path: '/setup/loans/loan-type/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'loanType'
        }
    }
]

export default LoanTypeRoutes
