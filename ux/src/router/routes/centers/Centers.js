import { CenterForm } from '../../../fixed/center/centerForm'
import { CenterList } from '../../../fixed/center/centerList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Centros',
    endPoint: 'Centers',
    list: {
        columns: CenterList
    },
    form: {
        form: CenterForm
    }
}
const CentersRoutes = [
    {
        path: '/center',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'centers'
        }
    },
    {
        path: '/center/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'centers'
        }
    },
    {
        path: '/center/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'centers'
        }
    }
]

export default CentersRoutes
