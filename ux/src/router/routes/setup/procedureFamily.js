import { ProcedureFamilyForm } from '../../../fixed/procedureFamily/procedureFamilyForm'
import { ProcedureFamilyList } from '../../../fixed/procedureFamily/procedureFamilyList'
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
