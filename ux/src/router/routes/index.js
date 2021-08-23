// ** Routes Imports
import CustomersRoutes from './customers/Customers'
import CarriersRoutes from './porters/carriers/Carriers'
import PagesRoutes from './Pages'
import { setupRoutes } from './setup'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/customers'

const sRoutes = setupRoutes()

// ** Merge Routes
const Routes = [
  ...CustomersRoutes,
  ...CarriersRoutes,
  ...PagesRoutes,
  ...sRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
