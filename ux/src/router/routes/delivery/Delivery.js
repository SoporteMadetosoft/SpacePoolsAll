import { DeliveryScreenList } from '../../../views/delivery/DeliveryScreenList'
import { ViewDeliveryNote } from '../../../views/delivery/ViewDeliveryNote'
import { ViewDeliveryScreen } from '../../../views/delivery/ViewDeliveryScreen'

const DeliveryRoutes = [
  {
    path: '/delivery',
    exact: true,
    component: () => <DeliveryScreenList titulo={'Gestor de entregas'} />,
    meta: {
      action: 'read',
      resource: 'delivery'
    }
  },
  {
    path: '/delivery/edit/:id',
    exact: true,
    component: () => <ViewDeliveryScreen />,
    meta: {
      action: 'update',
      resource: 'delivery'
    }
  },
  {
    path: '/delivery/note/:id',
    exact: true,
    component: () => <ViewDeliveryNote />,
    meta: {
      action: 'actions',
      resource: 'delivery'
    }
  }
]

export default DeliveryRoutes
