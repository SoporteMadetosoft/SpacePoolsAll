
import { PurchaseScreenList } from '@views/purchases/PurchaseScreenList'
import { PurchaseFormScreen } from '../../../views/purchases/PurchaseFormScreen'
import { PurchaseVerificationFormScreen } from '../../../views/purchases/PurchaseVerificationFormScreen'
import { ViewPurchaseScreen } from '../../../views/purchases/ViewPurchaseScreen'

const PurchasesRoutes = [
  {
    path: '/purchases',
    exact: true,
    component: () => <PurchaseScreenList titulo="Compras" />,
    meta: {
      action: 'read',
      resource: 'purchases'
    }
  },
  {
    path: '/purchases/add',
    exact: true,
    component: () => <PurchaseFormScreen />,
    meta: {
      action: 'insert',
      resource: 'purchases'
    }
  },
  {
    path: '/purchases/edit/:id',
    exact: true,
    component: () => <PurchaseFormScreen />,
    meta: {
      action: 'update',
      resource: 'purchases'
    }
  },
  {
    path: '/purchases/verify/:id',
    exact: true,
    component: () => <PurchaseVerificationFormScreen />,
    meta: {
      action: 'actions',
      resource: 'purchases'
    }
  },
  {
    path: '/purchases/view/:id',
    exact: true,
    component: () => <ViewPurchaseScreen />,
    meta: {
      action: 'actions',
      resource: 'purchases'
    }
  }
]

export default PurchasesRoutes
