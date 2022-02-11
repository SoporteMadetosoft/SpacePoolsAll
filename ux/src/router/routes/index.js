// ** Routes Imports
import { getUserData } from '../../auth/utils'
import CustomersRoutes from './customers/Customers'
import PagesRoutes from './Pages'

// ** Document title
const TemplateTitle = '%s - SpacePools'

// ** Default Route
const data = getUserData()
const main = data ? data.ability.find(reg => reg.action === 'read') : ''
const DefaultRoute = main !== null ? `/${main.subject}` : ''

// ** Merge Routes
const Routes = [
  ...CustomersRoutes,
  ...PagesRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
