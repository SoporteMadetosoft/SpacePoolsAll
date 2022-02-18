// ** Routes Imports
import { getUserData } from '../../auth/utils'
import PagesRoutes from './Pages'
import setupRoutes from './setup'

// ** Document title
const TemplateTitle = '%s - SpacePools'

// ** Default Route
const data = getUserData()
const main = data ? data.ability.find(reg => reg.action === 'read') : ''
const DefaultRoute = main !== null ? `/${main.subject}` : ''

// ** Merge Routes
const Routes = [
  ...PagesRoutes,
  ...setupRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
