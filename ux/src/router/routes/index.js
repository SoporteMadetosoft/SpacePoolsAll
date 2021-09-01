// ** Routes Imports
import CustomersRoutes from './customers/Customers'
import CarriersRoutes from './porters/carriers/Carriers'
import PagesRoutes from './Pages'
import { setupRoutes } from './setup'
import VendorsRoutes from './vendors/Vendors'
import VehiclesRoutes from './porters/vehicles/Vechicles'
import TrailersRoutes from './porters/trailers/Trailers'
import PoolsRoutes from './pools/Pools'
import PurchasesRoutes from './purchases/Purchases'
import ItemsRoutes from './items/Items'


// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/customers'

const sRoutes = setupRoutes()
// ** Merge Routes
const Routes = [
  ...TrailersRoutes,
  ...VehiclesRoutes,
  ...VendorsRoutes,
  ...CustomersRoutes,
  ...CarriersRoutes,
  ...PoolsRoutes,
  ...PurchasesRoutes,
  ...ItemsRoutes,
  ...PagesRoutes,
  ...sRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
