import { AddressesTypesScreenList } from "@views/setup/general/addressesTypes/AddressesTypesScreenList"
import { DepartmentsScreenList } from "@views/setup/general/departments/DepartmentsScreenList"
import { PaymentMethodsScreenList } from "@views/setup/general/paymentMethods/PaymentMethodsScreenList"
import { AddressesTypesFormScreen } from "@views/setup/general/addressesTypes/AddressesTypesFormScreen"
import { DepartmentsFormScreen } from "@views/setup/general/departments/DepartmentsFormScreen"
import { PaymentMethodsFormScreen } from "@views/setup/general/paymentMethods/PaymentMethodsFormScreen"
import { TaxesFormScreen } from "@views/setup/general/taxes/TaxesFormScreen"
import { TaxesListScreen } from "@views/setup/general/taxes/TaxesListScreen"


const generalRoutes = [
  {
    path: '/setup/general/paymentMethods',
    exact: true,
    component: () => <PaymentMethodsScreenList titulo={'Métodos de pago'} />
  },
  {
    path: '/setup/general/paymentMethods/add',
    exact: true,
    component: () => <PaymentMethodsFormScreen />
  },
  {
    path: '/setup/general/paymentMethods/edit/:id',
    exact: true,
    component: () => <PaymentMethodsFormScreen />
  },
  {
    path: '/setup/general/departments',
    exact: true,
    component: () => <DepartmentsScreenList titulo={'Departamentos'} />
  },
  {
    path: '/setup/general/departments/add',
    exact: true,
    component: () => <DepartmentsFormScreen />
  },
  {
    path: '/setup/general/departments/edit/:id',
    exact: true,
    component: () => <DepartmentsFormScreen />
  },
  {
    path: '/setup/general/addressesTypes',
    exact: true,
    component: () => <AddressesTypesScreenList titulo={'Tipos de dirección'} />
  },
  {
    path: '/setup/general/addressesTypes/add',
    exact: true,
    component: () => <AddressesTypesFormScreen />
  },
  {
    path: '/setup/general/addressesTypes/edit/:id',
    exact: true,
    component: () => <AddressesTypesFormScreen />
  }
  //{
  //  path: '/setup/general/taxes',
  //  exact: true,
  //  component: () =>  <TaxesListScreen titulo="Impuestos" />
  //},
  //{
  //  path: '/setup/general/taxes/add',
  //  exact: true,
  //  component: () => <TaxesFormScreen />
  //},
  //{
  //  path: '/setup/general/Taxes/edit/:id',
  //  exact: true,
  //  component: () => <TaxesFormScreen />
  //}
]

export default generalRoutes
