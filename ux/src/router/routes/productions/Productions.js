import { OrderFormScreen } from '../../../views/orders/OrderFormScreen'
import { ProductionFormScreen } from '../../../views/productions/ProductionFormScreen'
import { ProductionScreenList } from '../../../views/productions/ProductionScreenList'

const ProductionRoutes = [
  {
    path: '/production',
    exact: true,
    component: () => <ProductionScreenList titulo="Producciones" />,
    meta: {
      action: 'read',
      resource: 'production'
    }
  },
  {
    path: '/production/add',
    exact: true,
    component: () => <ProductionFormScreen />,
    meta: {
      action: 'insert',
      resource: 'production'
    }
  },
  {
    path: '/production/edit/:id',
    exact: true,
    component: () => <ProductionFormScreen />,
    meta: {
      action: 'update',
      resource: 'production'
    }
  }
]

export default ProductionRoutes
