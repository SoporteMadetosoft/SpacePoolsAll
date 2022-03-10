import { InstrumentForm } from '../../../fixed/instrument/instrumentForm'
import { InstrumentList } from '../../../fixed/instrument/instrumentList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Instrumentos',
    endPoint: 'Instruments',
    list: {
        columns: InstrumentList
    },
    form: {
        form: InstrumentForm
    }
}
const instrumentsRoutes = [
    {
        path: '/instruments',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'instruments'
        }
    },
    {
        path: '/instruments/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'instruments'
        }
    },
    {
        path: '/instruments/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'instruments'
        }
    }
]

export default instrumentsRoutes
