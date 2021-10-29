import { VendorTypeFormScreen } from '@views/setup/vendors/vendorType/VendorTypeFormScreen'
import { VendorTypeListScreen } from '@views/setup/vendors/vendorType/VendorTypeListScreen'

const vendorRoutes = [
  {
    path: '/setup/vendors/vendorType',
    exact: true,
    component: () => <VendorTypeListScreen titulo={'Tipos de proveedor'} />,
    meta: {
      action: 'read',
      resource: 'vendorType'
    }
  },
  {
    path: '/setup/vendors/vendorType/add',
    exact: true,
    component: () => <VendorTypeFormScreen />,
    meta: {
      action: 'insert',
      resource: 'vendorType'
    }
  },
  {
    path: '/setup/vendors/vendorType/edit/:id',
    exact: true,
    component: () => <VendorTypeFormScreen />,
    meta: {
      action: 'update',
      resource: 'vendorType'
    }
  }
]

export default vendorRoutes
