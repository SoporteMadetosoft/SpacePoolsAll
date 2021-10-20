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
import TrailerReparationRoutes from './porters/trailers/tReparation'
import VehicleReparationRoutes from './porters/vehicles/vReparation'
import DeliveryRoutes from './delivery/Delivery'
import UsersRoutes from './users/Users'
import RolesRoutes from './roles/Roles'

// ** Document title
const TemplateTitle = '%s - SpacePools'

// ** Default Route
const DefaultRoute = '/customers'

const sRoutes = setupRoutes()
// ** Merge Routes
const Routes = [
  ...TrailersRoutes,
  ...TrailerReparationRoutes,
  ...VehiclesRoutes,
  ...VehicleReparationRoutes,
  ...VendorsRoutes,
  ...CustomersRoutes,
  ...CarriersRoutes,
  ...PoolsRoutes,
  ...PurchasesRoutes,
  ...ItemsRoutes,
  ...OrdersRoutes,
  ...DeliveryRoutes,
  ...PagesRoutes,
  ...sRoutes,
  ...ProductionsRoutes,
  ...CalendarRoutes,
  ...TaxesRoutes,
  ...UsersRoutes,
  ...RolesRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
