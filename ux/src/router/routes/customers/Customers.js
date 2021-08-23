import { CustomerScreenList } from '@views/customers/CustomerScreenList'
import { CustomerFormScreen } from '@views/customers/CustomerFormScreen'

const CustomersRoutes = [
  {
    path: '/customers',
    exact: true,
    component: () => <CustomerScreenList titulo={'Clientes'} />
  },
  {
    path: '/customers/add',
    exact: true,
    component: () => <CustomerFormScreen />
  },
  {
    path: '/customers/edit/:id',
    exact: true,
    component: () => <CustomerFormScreen />
  }
]

export default CustomersRoutes
