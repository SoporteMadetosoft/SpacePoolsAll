import { IncidenceTypeForm } from '../../../fixed/setup/incidenceType/incidenceTypeForm'
import { IncidenceTypeList } from '../../../fixed/setup/incidenceType/incidenceTypeList'
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
            resource: 'incidenceType'
        }
    },
    {
        path: '/setup/incidences/incidence-type/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'incidenceType'
        }
    },
    {
        path: '/setup/incidences/incidence-type/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'incidenceType'
        }
    }
]

export default IncidenceTypeRoutes
