import { MaterialForm } from '../../../fixed/material/materialForm'
import { MaterialList } from '../../../fixed/material/materialList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Materiales',
    endPoint: 'Materials',
    list: {
        columns: MaterialList
    },
    form: {
        form: MaterialForm
    }
}
const MaterialsRoutes = [
    {
        path: '/materials',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'materials'
        }
    },
    {
        path: '/materials/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'materials'
        }
    },
    {
        path: '/materials/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'materials'
        }
    }
]

export default MaterialsRoutes
