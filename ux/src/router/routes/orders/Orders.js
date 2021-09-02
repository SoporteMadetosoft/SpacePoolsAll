import { OrderFormScreen } from '../../../views/orders/OrderFormScreen'
import { OrderScreenList } from '../../../views/orders/OrderScreenList'

const PurchasesRoutes = [
  {
    path: '/orders',
    exact: true,
    component: () => <OrderScreenList titulo="Pedidos" />
  },
  {
    path: '/orders/add',
    exact: true,
    component: () => <OrderFormScreen />
  },
  {
    path: '/orders/edit/:id',
    exact: true,
    component: () => <OrderFormScreen />
  }
]

export default PurchasesRoutes
