import { InstrumentTypeForm } from '../../../fixed/instrument/instrumentForm'
import { InstrumentTypeList } from '../../../fixed/instrument/instrumentList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Instrumentos',
    endPoint: 'InstrumentTypes',
    list: {
        columns: InstrumentTypeList
    },
    form: {
        form: InstrumentTypeForm
    }
}
const InstrumentTypesRoutes = [
    {
        path: '/instrumentTypes',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'instrumentTypes'
        }
    },
    {
        path: '/instrumentTypes/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'instrumentTypes'
        }
    },
    {
        path: '/instrumentTypes/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'instrumentTypes'
        }
    }
]

export default InstrumentTypesRoutes
