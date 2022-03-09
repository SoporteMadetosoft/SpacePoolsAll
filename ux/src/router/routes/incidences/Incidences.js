import { IncidenceForm } from '../../../fixed/incidence/incidenceForm'
import { IncidenceList } from '../../../fixed/incidence/incidenceList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Incidencias',
    endPoint: 'Incidences',
    list: {
        columns: IncidenceList
    },
    form: {
        form: IncidenceForm
    }
}
const IncidenceRoutes = [
    {
        path: '/incidences',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'incidences'
        }
    },
    {
        path: '/incidences/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'incidences'
        }
    },
    {
        path: '/incidences/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'incidences'
        }
    }
]

export default IncidenceRoutes
