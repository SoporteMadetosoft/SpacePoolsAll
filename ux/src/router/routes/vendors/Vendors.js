import { VendorsFormScreen } from "../../../views/vendors/VendorsFormScreen"
import { VendorsListScreen } from "../../../views/vendors/VendorsListScreen"

const VendorsRoutes = [
  {
    path: '/vendors',
    exact: true,
    component: () => <VendorsListScreen titulo={'Proveedores'} />
  },
  {
    path: '/vendors/add',
    exact: true,
    component: () => <VendorsFormScreen />
  },
  {
    path: '/vendors/edit/:id',
    exact: true,
    component: () => <VendorsFormScreen />
  }
]

export default VendorsRoutes
