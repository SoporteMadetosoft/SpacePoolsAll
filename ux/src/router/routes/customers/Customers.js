import { customerDocs } from '../../../fixed/customers/customerDocs'
import { CustomerForm } from '../../../fixed/customers/customerForm'
import { customersFilter } from '../../../fixed/customers/customersFilter'
import { customerList } from '../../../fixed/customers/customersList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
  title: 'Clientes',
  endPoint: 'Customers',
  list: {
    columns: customerList,
    filters: customersFilter
  },
  form: {
    form: CustomerForm,
    docColumns: customerDocs
  }
}
const CustomersRoutes = [
  {
    path: '/customers',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <ListScreen {...base} />,
    meta: {
      action: 'read',
      resource: 'customers'
    }
  },
  {
    path: '/customers/add',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <FormScreen {...base} />,
    meta: {
      action: 'insert',
      resource: 'customers'
    }
  },
  {
    path: '/customers/edit/:id',
    exact: true,
    layout: 'VerticalLayout',
    component: () => <FormScreen {...base} />,
    meta: {
      action: 'update',
      resource: 'customers'
    }
  }
]

export default CustomersRoutes
