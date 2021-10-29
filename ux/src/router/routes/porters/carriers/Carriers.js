import { CarrierScreenList } from '@views/carriers/CarrierScreenList'
import { CarrierFormScreen } from '@views/carriers/CarrierFormScreen'

const CarriersRoutes = [
  {
    path: '/porters/carriers',
    exact: true,
    component: () => <CarrierScreenList titulo={'Transportistas'} />,
    meta: {
      action: 'read',
      resource: 'carriers'
    }
  },
  {
    path: '/porters/carriers/add',
    exact: true,
    component: () => <CarrierFormScreen />,
    meta: {
      action: 'insert',
      resource: 'carriers'
    }
  },
  {
    path: '/porters/carriers/edit/:id',
    exact: true,
    component: () => <CarrierFormScreen />,
    meta: {
      action: 'update',
      resource: 'carriers'
    }
  }
]

export default CarriersRoutes
