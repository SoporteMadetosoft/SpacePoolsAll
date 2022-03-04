import { RouteForm } from '../../../fixed/route/routeForm'
import { RouteList } from '../../../fixed/route/routeList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Rutas',
    endPoint: 'Routes',
    list: {
        columns: RouteList
    },
    form: {
        form: RouteForm
    }
}
const RouteRoutes = [
    {
        path: '/routes',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'routes'
        }
    },
    {
        path: '/routes/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'routes'
        }
    },
    {
        path: '/routes/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'routes'
        }
    }
]

export default RouteRoutes
