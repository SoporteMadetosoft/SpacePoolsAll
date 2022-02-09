import { customerDocs } from '../../../fixed/customers/customerDocs'
import { CustomerForm } from '../../../fixed/customers/customerForm'
import { customersFilter } from '../../../fixed/customers/customersFilter'
import { customerList } from '../../../fixed/customers/customersList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const CustomersRoutes = [
  {
    path: '/customers',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <ListScreen titulo={'Clientes'} endPoint={'Customers'} columns={customerList} filters={customersFilter} />,
    meta: {
      action: 'read',
      resource: 'customers'
    }
  },
  {
    path: '/customers/add',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <FormScreen titulo={'Clientes'} endPoint={'Customers'} form={CustomerForm} docColumns={customerDocs} />,
    meta: {
      action: 'insert',
      resource: 'customers'
    }
  },
  {
    path: '/customers/edit/:id',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <FormScreen titulo={'Clientes'} endPoint={'Customers'} form={CustomerForm} docColumns={customerDocs} />,
    meta: {
      action: 'update',
      resource: 'customers'
    }
  }
]

export default CustomersRoutes
