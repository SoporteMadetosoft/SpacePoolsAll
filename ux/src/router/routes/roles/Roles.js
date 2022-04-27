import { RoleForm } from '../../../fixed/roles/roleForm'
import { RoleList } from '../../../fixed/roles/roleList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Roles',
    endPoint: 'Roles',
    list: {
        columns: RoleList
    },
    form: {
        form: RoleForm
    }
}
const RoleRoutes = [
    {
        path: '/role',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'roles'
        }
    },
    {
        path: '/role/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'roles'
        }
    },
    {
        path: '/role/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'roles'
        }
    }
]

export default RoleRoutes
