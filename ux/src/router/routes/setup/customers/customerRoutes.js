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
    component: () => <CustomerTypeScreenList titulo={'Tipos de cliente'} />,
    meta: {
      action: 'read',
      resource: 'customerType'
    }
  },
  {
    path: '/setup/customer/customerType/add',
    exact: true,
    component: () => <CustomerTypeFormScreen />,
    meta: {
      action: 'insert',
      resource: 'customerType'
    }
  },
  {
    path: '/setup/customer/customerType/edit/:id',
    exact: true,
    component: () => <CustomerTypeFormScreen />,
    meta: {
      action: 'update',
      resource: 'customerType'
    }
  },
  {
    path: '/setup/customer/category',
    exact: true,
    component: () => <CustomerCategoryScreenList titulo={'Categorias de cliente'} />,
    meta: {
      action: 'read',
      resource: 'customerCategory'
    }
  },
  {
    path: '/setup/customer/category/add',
    exact: true,
    component: () => <CustomerCategoryFormScreen />,
    meta: {
      action: 'insert',
      resource: 'customerCategory'
    }
  },
  {
    path: '/setup/customer/category/edit/:id',
    exact: true,
    component: () => <CustomerCategoryFormScreen />,
    meta: {
      action: 'update',
      resource: 'customerCategory'
    }
  },
  {
    path: '/setup/customer/activity',
    exact: true,
    component: () => <ActivityScreenList titulo={'Actividades'} />,
    meta: {
      action: 'read',
      resource: 'activity'
    }
  },
  {
    path: '/setup/customer/activity/add',
    exact: true,
    component: () => <ActivityFormScreen />,
    meta: {
      action: 'insert',
      resource: 'activity'
    }
  },
  {
    path: '/setup/customer/activity/edit/:id',
    exact: true,
    component: () => <ActivityFormScreen />,
    meta: {
      action: 'update',
      resource: 'activity'
    }
  },
  {
    path: '/setup/customer/origin',
    exact: true,
    component: () => <OriginScreenList titulo={'Origenes'} />,
    meta: {
      action: 'read',
      resource: 'origin'
    }
  },
  {
    path: '/setup/customer/origin/add',
    exact: true,
    component: () => <OriginFormScreen />,
    meta: {
      action: 'insert',
      resource: 'origin'
    }
  },
  {
    path: '/setup/customer/origin/edit/:id',
    exact: true,
    component: () => <OriginFormScreen />,
    meta: {
      action: 'update',
      resource: 'origin'
    }
  }
]

export default customerRoutes
