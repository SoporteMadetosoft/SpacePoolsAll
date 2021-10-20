import { RolesFormScreen } from "../../../views/roles/RolesFormScreen"
import { RolesScreenList } from "../../../views/roles/RolesListScreen"

const RolesRoutes = [
  {
    path: '/roles',
    exact: true,
    component: () => <RolesScreenList titulo="Roles" />
  },
  {
    path: '/roles/add',
    exact: true,
    component: () => <RolesFormScreen />
  },
  {
    path: '/roles/edit/:id',
    exact: true,
    component: () => <RolesFormScreen />
  }
]

export default RolesRoutes
