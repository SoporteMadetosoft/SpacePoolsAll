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
import MaterialsRoutes from './materials/Materials'
import InstrumentsRoutes from './instruments/Instruments'
import InstrumentalsRoutes from './instrumentals/Instrumentals'
import SheetsRoutes from './sheets/Sheets'
import LoansRoutes from './loans/Loans'
import DepositsRoutes from './deposits/Deposits'
import SalesRoutes from './sales/Sales'
import DeliverysRoutes from './deliverys/Deliverys'

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
  ...MaterialsRoutes,
  ...InstrumentsRoutes,
  ...InstrumentalsRoutes,
  ...SheetsRoutes,
  ...LoansRoutes,
  ...DepositsRoutes,
  ...SalesRoutes,
  ...DeliverysRoutes,
  ...UserRoutes,
  ...setupRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
