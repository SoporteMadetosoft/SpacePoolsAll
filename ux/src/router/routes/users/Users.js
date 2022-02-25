import { UserForm } from '../../../fixed/users/userForm'
import { UserList } from '../../../fixed/users/userList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Usuarios',
    endPoint: 'Users',
    list: {
        columns: UserList
    },
    form: {
        form: UserForm
    }
}
const UserRoutes = [
    {
        path: '/user',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'users'
        }
    },
    {
        path: '/user/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'users'
        }
    },
    {
        path: '/user/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'users'
        }
    }
]

export default UserRoutes
