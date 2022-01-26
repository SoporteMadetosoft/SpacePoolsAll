import { CustomerForm } from '../../../fixed/customers/customerForm'
import { customerList } from '../../../fixed/customers/customersList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const CustomersRoutes = [
  {
    path: '/customers',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <ListScreen titulo={'Clientes'} endPoint={'Customers'} columns={customerList} />,
    meta: {
      action: 'read',
      resource: 'customers'
    }
  },
  {
    path: '/customers/add',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <FormScreen titulo={'Clientes'} endPoint={'Customers'} form={CustomerForm} />,
    meta: {
      action: 'insert',
      resource: 'customers'
    }
  },
  {
    path: '/customers/edit/:id',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <FormScreen titulo={'Clientes'} endPoint={'Customers'} form={CustomerForm} />,
    meta: {
      action: 'update',
      resource: 'customers'
    }
  }
]

export default CustomersRoutes
