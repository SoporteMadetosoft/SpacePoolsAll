import { VehiclesFormScreen } from "../../../../views/vehicles/VehiclesFormScreen"
import { VehiclesListScreen } from "../../../../views/vehicles/VehiclesListScreen"

const VehiclesRoutes = [
  {
    path: '/porters/vehicles',
    exact: true,
    component: () => <VehiclesListScreen titulo={'Vehículos'} />
  },
  {
    path: '/porters/vehicles/add',
    exact: true,
    component: () => <VehiclesFormScreen />
  },
  {
    path: '/porters/vehicles/edit/:id',
    exact: true,
    component: () => <VehiclesFormScreen />
  }
]

export default VehiclesRoutes
