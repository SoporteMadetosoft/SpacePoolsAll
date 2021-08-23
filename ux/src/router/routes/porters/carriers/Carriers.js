import { CarrierScreenList } from '@views/carriers/CarrierScreenList'
import { CarrierFormScreen } from '@views/carriers/CarrierFormScreen'


const CarriersRoutes = [
  {
    path: '/porters/carriers',
    exact: true,
    component: () => <CarrierScreenList titulo={'Transportistas'} />
  },
  {
    path: '/porters/carriers/add',
    exact: true,
    component: () => <CarrierFormScreen />
  },
  {
    path: '/porters/carriers/edit/:id',
    exact: true,
    component: () => <CarrierFormScreen />
  }
]

export default CarriersRoutes
