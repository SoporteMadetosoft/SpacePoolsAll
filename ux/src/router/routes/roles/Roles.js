import { RolesFormScreen } from "../../../views/roles/RolesFormScreen"
import { RolesScreenList } from "../../../views/roles/RolesListScreen"

const RolesRoutes = [
  {
    path: '/roles',
    exact: true,
    component: () => <RolesScreenList titulo="Roles" />,
    meta: {
      action: 'read',
      resource: 'roles'
    }
  },
  {
    path: '/roles/add',
    exact: true,
    component: () => <RolesFormScreen />,
    meta: {
      action: 'insert',
      resource: 'roles'
    }
  },
  {
    path: '/roles/edit/:id',
    exact: true,
    component: () => <RolesFormScreen />,
    meta: {
      action: 'update',
      resource: 'roles'
    }
  }
]

export default RolesRoutes
