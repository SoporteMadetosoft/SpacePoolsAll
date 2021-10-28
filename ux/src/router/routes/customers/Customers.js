import { CustomerScreenList } from '@views/customers/CustomerScreenList'
import { CustomerFormScreen } from '@views/customers/CustomerFormScreen'

const CustomersRoutes = [
  {
    path: '/customers',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <CustomerScreenList titulo={'Clientes'} />,
    meta: {
      action: 'read',
      resource: 'customers'
    }
  },
  {
    path: '/customers/add',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <CustomerFormScreen />,
    meta: {
      action: 'insert',
      resource: 'customers'
    }
  },
  {
    path: '/customers/edit/:id',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <CustomerFormScreen />,
    meta: {
      action: 'update',
      resource: 'customers'
    }
  }
]

export default CustomersRoutes
