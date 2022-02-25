import { MutuaForm } from '../../../fixed/mutua/mutuaForm'
import { MutuaList } from '../../../fixed/mutua/mutuaList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Mutuas',
    endPoint: 'Mutuas',
    list: {
        columns: MutuaList
    },
    form: {
        form: MutuaForm
    }
}
const MutuasRoutes = [
    {
        path: '/mutua',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'mutuas'
        }
    },
    {
        path: '/mutua/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'mutuas'
        }
    },
    {
        path: '/mutua/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'mutuas'
        }
    }
]

export default MutuasRoutes
