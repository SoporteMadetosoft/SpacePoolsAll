import { SurgeryForm } from '../../../fixed/surgery/surgeryForm'
import { SurgeryList } from '../../../fixed/surgery/surgeryList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Cirugías',
    endPoint: 'Surgery',
    list: {
        columns: SurgeryList
    },
    form: {
        form: SurgeryForm
    }
}
const SurgeryRoutes = [
    {
        path: '/surgery',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'surgery'
        }
    },
    {
        path: '/surgery/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'surgery'
        }
    },
    {
        path: '/surgery/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'surgery'
        }
    }
]

export default SurgeryRoutes
