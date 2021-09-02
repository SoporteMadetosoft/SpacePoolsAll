
import { PurchaseScreenList } from '@views/purchases/PurchaseScreenList'
import { PurchaseFormScreen } from '../../../views/purchases/PurchaseFormScreen'

const PurchasesRoutes = [
  {
    path: '/purchases',
    exact: true,
    component: () => <PurchaseScreenList titulo="Compras" />
  },
  {
    path: '/purchases/add',
    exact: true,
    component: () => <PurchaseFormScreen />
  },
  {
    path: '/purchases/edit/:id',
    exact: true,
    component: () => <PurchaseFormScreen />
  }
]

export default PurchasesRoutes
