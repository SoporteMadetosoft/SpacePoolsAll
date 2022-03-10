import { InstrumentalForm } from '../../../fixed/instrumental/instrumentalForm'
import { InstrumentalList } from '../../../fixed/instrumental/instrumentalList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Instrumentales',
    endPoint: 'Instrumentals',
    list: {
        columns: InstrumentalList
    },
    form: {
        form: InstrumentalForm
    }
}
const InstrumentalsRoutes = [
    {
        path: '/instrumentals',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'instrumentals'
        }
    },
    {
        path: '/instrumentals/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'instrumentals'
        }
    },
    {
        path: '/instrumentals/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'instrumentals'
        }
    }
]

export default InstrumentalsRoutes
