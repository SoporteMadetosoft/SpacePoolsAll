import { OrderFormScreen } from '../../../views/orders/OrderFormScreen'
import { ProductionScreenList } from '../../../views/productions/ProductionScreenList'
 
const ProductionRoutes = [
  {
    path: '/production',
    exact: true,
    component: () => <ProductionScreenList titulo="Producciones" />
  },
  {
    path: '/production/add',
    exact: true,
    component: () => <OrderFormScreen />
  },
  {
    path: '/production/edit/:id',
    exact: true,
    component: () => <OrderFormScreen />
  }
]

export default ProductionRoutes
