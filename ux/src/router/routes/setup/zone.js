import { ZoneForm } from '../../../fixed/setup/zone/zoneForm'
import { ZoneList } from '../../../fixed/setup/zone/zoneList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Zonas',
    endPoint: 'Zone',
    list: {
        columns: ZoneList
    },
    form: {
        form: ZoneForm
    }
}
const ZoneRoutes = [
    {
        path: '/setup/centers/zone',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'zone'
        }
    },
    {
        path: '/setup/centers/zone/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'zone'
        }
    },
    {
        path: '/setup/centers/zone/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'zone'
        }
    }
]

export default ZoneRoutes
