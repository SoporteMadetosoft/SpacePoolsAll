<<<<<<< HEAD
import { ProcedureFamilyForm } from '../../../fixed/setup/procedureFamily/procedureFamilyForm'
import { ProcedureFamilyList } from '../../../fixed/setup/procedureFamily/procedureFamilyList'
=======
import { ProcedureFamilyForm } from '../../../fixed/procedureFamily/procedureFamilyForm'
import { ProcedureFamilyList } from '../../../fixed/procedureFamily/procedureFamilyList'
>>>>>>> 710498fa0e745d4ad55e02b9f89ae58e86b613b9
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Familia del procedimiento',
    endPoint: 'ProcedureFamily',
    list: {
        columns: ProcedureFamilyList
    },
    form: {
        form: ProcedureFamilyForm
    }
}
const ProcedureFamilyRoutes = [
    {
        path: '/setup/procedures/procedure-family',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'procedureFamily'
        }
    },
    {
        path: '/setup/procedures/procedure-family/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'procedureFamily'
        }
    },
    {
        path: '/setup/procedures/procedure-family/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'procedureFamily'
        }
    }
]

export default ProcedureFamilyRoutes
