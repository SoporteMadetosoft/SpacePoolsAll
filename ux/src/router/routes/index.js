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
import OrdersRoutes from './orders/Orders'
import ProductionsRoutes from './productions/Productions'
import CalendarRoutes from './calendar/Calendar'
import TaxesRoutes from './setup/taxes/TaxesRotes'

// ** Document title
const TemplateTitle = '%s - SpacePools'

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
  ...OrdersRoutes,
  ...PagesRoutes,
  ...sRoutes,
  ...ProductionsRoutes,
  ...CalendarRoutes,
  ...TaxesRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
