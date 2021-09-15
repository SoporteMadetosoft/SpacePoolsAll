
import { TaxesFormScreen } from '../../../../views/setup/general/taxes/TaxesFormScreen'
import { TaxesListScreen } from '../../../../views/setup/general/taxes/TaxesListScreen'

const TaxesRoutes = [
  {
    path: '/setup/taxes',
    exact: true,
    component: () => <TaxesListScreen titulo="Impuestos" />
  },
  {
    path: '/setup/taxes/add',
    exact: true,
    component: () => <TaxesFormScreen />
  },
  {
    path: '/setup/taxes/edit/:id',
    exact: true,
    component: () => <TaxesFormScreen />
  }
]

export default TaxesRoutes
