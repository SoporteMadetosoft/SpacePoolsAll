import { DeliveryScreenList } from '../../../views/delivery/DeliveryScreenList'
import { ViewDeliveryScreen } from '../../../views/delivery/ViewDeliveryScreen'

const DeliveryRoutes = [
  {
    path: '/delivery',
    exact: true,
    component: () => <DeliveryScreenList titulo={'Gestor de entregas'} />
  },
  {
    path: '/delivery/edit/:id',
    exact: true,
    component: () => <ViewDeliveryScreen />
  }
]

export default DeliveryRoutes
