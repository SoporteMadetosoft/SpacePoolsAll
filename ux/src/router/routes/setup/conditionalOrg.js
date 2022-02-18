import { ConditionalOrgForm } from '../../../fixed/conditionalOrg/conditionalOrgForm'
import { ConditionalOrgList } from '../../../fixed/conditionalOrg/conditionalOrgList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Organización condicional',
    endPoint: 'ConditionalOrg',
    list: {
        columns: ConditionalOrgList
    },
    form: {
        form: ConditionalOrgForm
    }
}
const ConditionalOrgRoutes = [
    {
        path: '/setup/centers/conditional-org',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'conditionalOrg'
        }
    },
    {
        path: '/setup/centers/conditional-org/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'conditionalOrg'
        }
    },
    {
        path: '/setup/centers/conditional-org/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'conditionalOrg'
        }
    }
]

export default ConditionalOrgRoutes
