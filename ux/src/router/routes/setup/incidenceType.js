import { IncidenceTypeForm } from '../../../fixed/incidenceType/incidenceTypeForm'
import { IncidenceTypeList } from '../../../fixed/incidenceType/incidenceTypeList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Tipo de incidencia',
    endPoint: 'IncidenceType',
    list: {
        columns: IncidenceTypeList
    },
    form: {
        form: IncidenceTypeForm
    }
}
const IncidenceTypeRoutes = [
    {
        path: '/setup/incidences/incidence-type',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'customers'
        }
    },
    {
        path: '/setup/incidences/incidence-type/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'customers'
        }
    },
    {
        path: '/setup/incidences/incidence-type/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'customers'
        }
    }
]

export default IncidenceTypeRoutes
