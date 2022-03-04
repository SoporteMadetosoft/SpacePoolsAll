import { VehicleForm } from '../../../fixed/vehicle/vehicleForm'
import { VehicleList } from '../../../fixed/vehicle/vehicleList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Vehículos',
    endPoint: 'Vehicles',
    list: {
        columns: VehicleList
    },
    form: {
        form: VehicleForm
    }
}
const VehicleRoutes = [
    {
        path: '/vehicles',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'vehicles'
        }
    },
    {
        path: '/vehicles/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'vehicles'
        }
    },
    {
        path: '/vehicles/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'vehicles'
        }
    }
]

export default VehicleRoutes
