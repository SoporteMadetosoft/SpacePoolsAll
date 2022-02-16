import { IncidenceReasonForm } from '../../../fixed/incidenceReason/incidenceReasonForm'
import { IncidenceReasonList } from '../../../fixed/incidenceReason/incidenceReasonList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Motivo de incidencia',
    endPoint: 'IncidenceReason',
    list: {
        columns: IncidenceReasonList
    },
    form: {
        form: IncidenceReasonForm
    }
}
const IncidenceReasonRoutes = [
    {
        path: '/setup/incidences/incidence-reason',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'customers'
        }
    },
    {
        path: '/setup/incidences/incidence-reason/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'customers'
        }
    },
    {
        path: '/setup/incidences/incidence-reason/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'customers'
        }
    }
]

export default IncidenceReasonRoutes
