import { UsersFormScreen } from "../../../views/users/UsersFormScreen"
import { UsersListScreen } from "../../../views/users/UsersListScreen"

const UsersRoutes = [
  {
    path: '/users',
    exact: true,
    component: () => <UsersListScreen titulo="Usuarios" />,
    meta: {
      action: 'read',
      resource: 'users'
    }
  },
  {
    path: '/users/add',
    exact: true,
    component: () => <UsersFormScreen />,
    meta: {
      action: 'insert',
      resource: 'users'
    }
  },
  {
    path: '/users/edit/:id',
    exact: true,
    component: () => <UsersFormScreen />,
    meta: {
      action: 'update',
      resource: 'users'
    }
  }
]

export default UsersRoutes
