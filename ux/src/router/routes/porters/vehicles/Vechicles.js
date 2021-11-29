import { VehiclesFormScreen } from "../../../../views/vehicles/VehiclesFormScreen"
import { VehiclesListScreen } from "../../../../views/vehicles/VehiclesListScreen"

const VehiclesRoutes = [
  {
    path: '/porters/vehicles',
    exact: true,
    component: () => <VehiclesListScreen titulo={'Vehículos'} />,
    meta: {
      action: 'read',
      resource: 'vehicles'
    }
  },
  {
    path: '/porters/vehicles/add',
    exact: true,
    component: () => <VehiclesFormScreen />,
    meta: {
      action: 'insert',
      resource: 'vehicles'
    }
  },
  {
    path: '/porters/vehicles/edit/:id',
    exact: true,
    component: () => <VehiclesFormScreen />,
    meta: {
      action: 'update',
      resource: 'vehicles'
    }
  }
]

export default VehiclesRoutes
