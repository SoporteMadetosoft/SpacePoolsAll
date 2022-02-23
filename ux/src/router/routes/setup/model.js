import { ModelForm } from '../../../fixed/setup/model/modelForm'
import { ModelList } from '../../../fixed/setup/model/modelList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Modelos',
    endPoint: 'Model',
    list: {
        columns: ModelList
    },
    form: {
        form: ModelForm
    }
}
const ModelRoutes = [
    {
        path: '/setup/vehicles/model',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'model'
        }
    },
    {
        path: '/setup/vehicles/model/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'model'
        }
    },
    {
        path: '/setup/vehicles/model/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'model'
        }
    }
]

export default ModelRoutes
