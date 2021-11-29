
import { TaxesFormScreen } from '../../../../views/setup/general/taxes/TaxesFormScreen'
import { TaxesListScreen } from '../../../../views/setup/general/taxes/TaxesListScreen'

const TaxesRoutes = [
  {
    path: '/setup/taxes',
    exact: true,
    component: () => <TaxesListScreen titulo="Impuestos" />,
    meta: {
      action: 'read',
      resource: 'taxes'
    }
  },
  {
    path: '/setup/taxes/add',
    exact: true,
    component: () => <TaxesFormScreen />,
    meta: {
      action: 'insert',
      resource: 'taxes'
    }
  },
  {
    path: '/setup/taxes/edit/:id',
    exact: true,
    component: () => <TaxesFormScreen />,
    meta: {
      action: 'update',
      resource: 'taxes'
    }
  }
]

export default TaxesRoutes
