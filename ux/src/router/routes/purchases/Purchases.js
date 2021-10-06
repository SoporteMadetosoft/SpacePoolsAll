
import { PurchaseScreenList } from '@views/purchases/PurchaseScreenList'
import { PurchaseFormScreen } from '../../../views/purchases/PurchaseFormScreen'
import { PurchaseVerificationFormScreen } from '../../../views/purchases/PurchaseVerificationFormScreen'

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
  },
  {
    path: '/purchases/verify/:id',
    exact: true,
    component: () => <PurchaseVerificationFormScreen />
  }
]

export default PurchasesRoutes
