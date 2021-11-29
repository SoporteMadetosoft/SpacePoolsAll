import { OrderFormScreen } from '../../../views/orders/OrderFormScreen'
import { OrderScreenList } from '../../../views/orders/OrderScreenList'

const PurchasesRoutes = [
  {
    path: '/orders',
    exact: true,
    component: () => <OrderScreenList titulo="Pedidos" />,
    meta: {
      action: 'read',
      resource: 'orders'
    }
  },
  {
    path: '/orders/add',
    exact: true,
    component: () => <OrderFormScreen />,
    meta: {
      action: 'insert',
      resource: 'orders'
    }
  },
  {
    path: '/orders/edit/:id',
    exact: true,
    component: () => <OrderFormScreen />,
    meta: {
      action: 'update',
      resource: 'orders'
    }
  }
]

export default PurchasesRoutes
