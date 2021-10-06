import { VehicleReparationFormScreen } from '../../../../views/vReparation/VehicleReparationFormScreen'
import { VehicleReparationListScreen } from '../../../../views/vReparation/VehicleReparationListScreen'


const VehicleReparationRoutes = [
    {
        path: '/porters/vehicles/vReparation/:id',
        exact: true,
        component: () => <VehicleReparationListScreen titulo={'Reparaciones'} />
    },
    {
        path: '/porters/vehicles/vReparation/:index/add',
        exact: true,
        component: () => <VehicleReparationFormScreen />
    },
    {
        path: '/porters/vehicles/vReparation/:index/edit/:id',
        exact: true,
        component: () => <VehicleReparationFormScreen />
    }
]

export default VehicleReparationRoutes
