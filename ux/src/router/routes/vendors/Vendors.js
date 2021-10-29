import { VendorsFormScreen } from "../../../views/vendors/VendorsFormScreen"
import { VendorsListScreen } from "../../../views/vendors/VendorsListScreen"

const VendorsRoutes = [
  {
    path: '/vendors',
    exact: true,
    component: () => <VendorsListScreen titulo={'Proveedores'} />,
    meta: {
      action: 'read',
      resource: 'vendors'
    }
  },
  {
    path: '/vendors/add',
    exact: true,
    component: () => <VendorsFormScreen />,
    meta: {
      action: 'insert',
      resource: 'vendors'
    }
  },
  {
    path: '/vendors/edit/:id',
    exact: true,
    component: () => <VendorsFormScreen />,
    meta: {
      action: 'update',
      resource: 'vendors'
    }
  }
]

export default VendorsRoutes
