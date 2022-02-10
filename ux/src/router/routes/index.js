// ** Routes Imports
import CustomersRoutes from './customers/Customers'

// ** Document title
const TemplateTitle = '%s - SpacePools'

// ** Default Route
const data = getUserData()
const main = data ? data.ability.find(reg => reg.action === 'read') : ''
const DefaultRoute = main !== null ? `/${main.subject}` : ''

// ** Merge Routes
const Routes = [
  ...CustomersRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
