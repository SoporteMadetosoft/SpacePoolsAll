import { OrderFormScreen } from '../../../views/orders/OrderFormScreen'
import { ProductionFormScreen } from '../../../views/productions/ProductionFormScreen'
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
    component: () => <ProductionFormScreen />
  },
  {
    path: '/production/edit/:id',
    exact: true,
    component: () => <ProductionFormScreen />
  }
]

export default ProductionRoutes
