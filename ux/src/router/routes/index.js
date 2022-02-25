// ** Routes Imports
import { getUserData } from '../../auth/utils'
import { getHomeRouteForLoggedInUser } from '@utils'
import DoctorRoutes from './doctors/Doctors'
import MutuasRoutes from './mutuas/Mutuas'
import PagesRoutes from './Pages'
import ProcedureRoutes from './procedures/Procedures'
import setupRoutes from './setup'
import UserRoutes from './users/Users'

// ** Document title
const TemplateTitle = '%s - SpacePools'

// ** Default Route
const data = getUserData()
const main = data ? data.ability.find(reg => reg.action === 'read') : ''
const DefaultRoute = main ? getHomeRouteForLoggedInUser() : ''

// ** Merge Routes
const Routes = [
  ...PagesRoutes,
  ...MutuasRoutes,
  ...DoctorRoutes,
  ...ProcedureRoutes,
  ...UserRoutes,
  ...setupRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
