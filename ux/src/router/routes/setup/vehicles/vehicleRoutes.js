import { BrandFormScreen } from '@views/setup/vehicles/brand/BrandFormScreen'
import { BrandListScreen } from '@views/setup/vehicles/brand/BrandListScreen'
import { ModelFormScreen } from '@views/setup/vehicles/model/ModelFormScreen'
import { ModelListScreen } from '@views/setup/vehicles/model/ModelListScreen'

const vehicleRoutes = [
  {
    path: '/setup/vehicles/brand',
    exact: true,
    component: () => <BrandListScreen titulo={'Marcas'} />,
    meta: {
      action: 'read',
      resource: 'brand'
    }
  },
  {
    path: '/setup/vehicles/brand/add',
    exact: true,
    component: () => <BrandFormScreen />,
    meta: {
      action: 'insert',
      resource: 'brand'
    }
  },
  {
    path: '/setup/vehicles/brand/edit/:id',
    exact: true,
    component: () => <BrandFormScreen />,
    meta: {
      action: 'update',
      resource: 'brand'
    }
  },
  {
    path: '/setup/vehicles/model',
    exact: true,
    component: () => <ModelListScreen titulo={'Modelos'} />,
    meta: {
      action: 'read',
      resource: 'model'
    }
  },
  {
    path: '/setup/vehicles/model/add',
    exact: true,
    component: () => <ModelFormScreen />,
    meta: {
      action: 'insert',
      resource: 'model'
    }
  },
  {
    path: '/setup/vehicles/model/edit/:id',
    exact: true,
    component: () => <ModelFormScreen />,
    meta: {
      action: 'update',
      resource: 'model'
    }
  }
]

export default vehicleRoutes
