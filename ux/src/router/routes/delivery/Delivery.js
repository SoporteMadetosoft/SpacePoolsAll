import { DeliveryScreenList } from '../../../views/delivery/DeliveryScreenList'
import { ViewDeliveryNote } from '../../../views/delivery/ViewDeliveryNote'
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
  },
  {
    path: '/delivery/note/:id',
    exact: true,
    component: () => <ViewDeliveryNote />
  }
]

export default DeliveryRoutes
