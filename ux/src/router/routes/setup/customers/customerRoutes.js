import { CustomerTypeFormScreen } from '@views/setup/customers/customerType/CustomerTypeFormScreen'
import { CustomerTypeScreenList } from '@views/setup/customers/customerType/CustomerTypeListScreen'
import { CustomerCategoryFormScreen } from '@views/setup/customers/customerCategory/CustomerCategoryFormScreen'
import { ActivityFormScreen } from '@views/setup/customers/activity/ActivityFormScreen'
import { OriginFormScreen } from '@views/setup/customers/origin/OriginFormScreen'
import { ActivityScreenList } from '@views/setup/customers/activity/ActivityListScreen'
import { OriginScreenList } from '@views/setup/customers/origin/OriginListScreen'
import { CustomerCategoryScreenList } from '@views/setup/customers/customerCategory/CustomerCategoryListScreen'

const customerRoutes = [
  {
    path: '/setup/customer/customerType',
    exact: true,
    component: () => <CustomerTypeScreenList titulo={'Tipos de cliente'} />
  },
  {
    path: '/setup/customer/customerType/add',
    exact: true,
    component: () => <CustomerTypeFormScreen />
  },
  {
    path: '/setup/customer/customerType/edit/:id',
    exact: true,
    component: () => <CustomerTypeFormScreen />
  },
  {
    path: '/setup/customer/category',
    exact: true,
    component: () => <CustomerCategoryScreenList titulo={'Categorias de cliente'} />
  },
  {
    path: '/setup/customer/category/add',
    exact: true,
    component: () => <CustomerCategoryFormScreen />
  },
  {
    path: '/setup/customer/category/edit/:id',
    exact: true,
    component: () => <CustomerCategoryFormScreen />
  },
  {
    path: '/setup/customer/activity',
    exact: true,
    component: () => <ActivityScreenList titulo={'Actividades'} />
  },
  {
    path: '/setup/customer/activity/add',
    exact: true,
    component: () => <ActivityFormScreen />
  },
  {
    path: '/setup/customer/activity/edit/:id',
    exact: true,
    component: () => <ActivityFormScreen />
  },
  {
    path: '/setup/customer/origin',
    exact: true,
    component: () => <OriginScreenList titulo={'Origenes'} />
  },
  {
    path: '/setup/customer/origin/add',
    exact: true,
    component: () => <OriginFormScreen />
  },
  {
    path: '/setup/customer/origin/edit/:id',
    exact: true,
    component: () => <OriginFormScreen />
  }
]

export default customerRoutes
