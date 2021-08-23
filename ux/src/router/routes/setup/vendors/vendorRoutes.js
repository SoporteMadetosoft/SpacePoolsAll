import { VendorTypeFormScreen } from '@views/setup/vendors/vendorType/VendorTypeFormScreen'
import { VendorTypeListScreen } from '@views/setup/vendors/vendorType/VendorTypeListScreen'

const vendorRoutes = [
  {
    path: '/setup/vendors/vendorType',
    exact: true,
    component: () => <VendorTypeListScreen titulo={'Tipos de proveedor'} />
  },
  {
    path: '/setup/vendors/vendorType/add',
    exact: true,
    component: () => <VendorTypeFormScreen />
  },
  {
    path: '/setup/vendors/vendorType/edit/:id',
    exact: true,
    component: () => <VendorTypeFormScreen />
  }
]

export default vendorRoutes
