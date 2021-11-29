import { AddressesTypesScreenList } from "@views/setup/general/addressesTypes/AddressesTypesScreenList"
import { DepartmentsScreenList } from "@views/setup/general/departments/DepartmentsScreenList"
import { PaymentMethodsScreenList } from "@views/setup/general/paymentMethods/PaymentMethodsScreenList"
import { AddressesTypesFormScreen } from "@views/setup/general/addressesTypes/AddressesTypesFormScreen"
import { DepartmentsFormScreen } from "@views/setup/general/departments/DepartmentsFormScreen"
import { PaymentMethodsFormScreen } from "@views/setup/general/paymentMethods/PaymentMethodsFormScreen"

const generalRoutes = [
  {
    path: '/setup/general/paymentMethods',
    exact: true,
    component: () => <PaymentMethodsScreenList titulo={'Métodos de pago'} />,
    meta: {
      action: 'read',
      resource: 'paymentMethods'
    }
  },
  {
    path: '/setup/general/paymentMethods/add',
    exact: true,
    component: () => <PaymentMethodsFormScreen />,
    meta: {
      action: 'insert',
      resource: 'paymentMethods'
    }
  },
  {
    path: '/setup/general/paymentMethods/edit/:id',
    exact: true,
    component: () => <PaymentMethodsFormScreen />,
    meta: {
      action: 'update',
      resource: 'paymentMethods'
    }
  },
  {
    path: '/setup/general/departments',
    exact: true,
    component: () => <DepartmentsScreenList titulo={'Departamentos'} />,
    meta: {
      action: 'read',
      resource: 'departments'
    }
  },
  {
    path: '/setup/general/departments/add',
    exact: true,
    component: () => <DepartmentsFormScreen />,
    meta: {
      action: 'insert',
      resource: 'departments'
    }
  },
  {
    path: '/setup/general/departments/edit/:id',
    exact: true,
    component: () => <DepartmentsFormScreen />,
    meta: {
      action: 'update',
      resource: 'departments'
    }
  },
  {
    path: '/setup/general/addressesTypes',
    exact: true,
    component: () => <AddressesTypesScreenList titulo={'Tipos de dirección'} />,
    meta: {
      action: 'read',
      resource: 'addressesTypes'
    }
  },
  {
    path: '/setup/general/addressesTypes/add',
    exact: true,
    component: () => <AddressesTypesFormScreen />,
    meta: {
      action: 'insert',
      resource: 'addressesTypes'
    }
  },
  {
    path: '/setup/general/addressesTypes/edit/:id',
    exact: true,
    component: () => <AddressesTypesFormScreen />,
    meta: {
      action: 'update',
      resource: 'addressesTypes'
    }
  }
]

export default generalRoutes
