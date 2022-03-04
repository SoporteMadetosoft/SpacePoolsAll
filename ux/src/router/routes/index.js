// ** Routes Imports
import { getUserData } from '../../auth/utils'
import { getHomeRouteForLoggedInUser } from '@utils'
import DoctorRoutes from './doctors/Doctors'
import CenterRoutes from './centers/Centers'
import MutuasRoutes from './mutuas/Mutuas'
import PagesRoutes from './Pages'
import ProcedureRoutes from './procedures/Procedures'
import SurgeryRoutes from './surgery/Surgery'
import VehicleRoutes from './vehicles/Vehicles'
import RouteRoutes from './routes/Routes'
import IncidenceRoutes from './incidences/Incidences'
import setupRoutes from './setup'
import UserRoutes from './users/Users'

// ** Document title
const TemplateTitle = '%s - CONMED'

// ** Default Route
const data = getUserData()
const main = data ? data.ability.find(reg => reg.action === 'read') : ''
const DefaultRoute = main ? getHomeRouteForLoggedInUser() : ''

// ** Merge Routes
const Routes = [
  ...PagesRoutes,
  ...MutuasRoutes,
  ...CenterRoutes,
  ...DoctorRoutes,
  ...ProcedureRoutes,
  ...SurgeryRoutes,
  ...VehicleRoutes,
  ...RouteRoutes,
  ...IncidenceRoutes,
  ...UserRoutes,
  ...setupRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
