import { UsersFormScreen } from "../../../views/users/UsersFormScreen"
import { UsersListScreen } from "../../../views/users/UsersListScreen"

const UsersRoutes = [
  {
    path: '/users',
    exact: true,
    component: () => <UsersListScreen titulo="Usuarios" />
  },
  {
    path: '/users/add',
    exact: true,
    component: () => <UsersFormScreen />
  },
  {
    path: '/users/edit/:id',
    exact: true,
    component: () => <UsersFormScreen />
  }
]

export default UsersRoutes
