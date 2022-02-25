import { ProcedureForm } from '../../../fixed/procedures/procedureForm'
import { ProcedureList } from '../../../fixed/procedures/procedureList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Procedimientos',
    endPoint: 'Procedures',
    list: {
        columns: ProcedureList
    },
    form: {
        form: ProcedureForm
    }
}
const ProcedureRoutes = [
    {
        path: '/procedure',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'procedures'
        }
    },
    {
        path: '/procedure/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'procedures'
        }
    },
    {
        path: '/procedure/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'procedures'
        }
    }
]

export default ProcedureRoutes
