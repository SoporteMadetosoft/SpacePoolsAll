import { BrandFormScreen } from '@views/setup/vehicles/brand/BrandFormScreen'
import { BrandListScreen } from '@views/setup/vehicles/brand/BrandListScreen'
import { ModelFormScreen } from '@views/setup/vehicles/model/ModelFormScreen'
import { ModelListScreen } from '@views/setup/vehicles/model/ModelListScreen'

const vehicleRoutes = [
  {
    path: '/setup/vehicles/brand',
    exact: true,
    component: () => <BrandListScreen titulo={'Marcas'} />
  },
  {
    path: '/setup/vehicles/brand/add',
    exact: true,
    component: () => <BrandFormScreen />
  },
  {
    path: '/setup/vehicles/brand/edit/:id',
    exact: true,
    component: () => <BrandFormScreen />
  },
  {
    path: '/setup/vehicles/model',
    exact: true,
    component: () => <ModelListScreen titulo={'Modelos'} />
  },
  {
    path: '/setup/vehicles/model/add',
    exact: true,
    component: () => <ModelFormScreen />
  },
  {
    path: '/setup/vehicles/model/edit/:id',
    exact: true,
    component: () => <ModelFormScreen />
  }
]

export default vehicleRoutes
