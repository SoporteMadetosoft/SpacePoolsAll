import { FamilyForm } from '../../../fixed/setup/family/familyForm'
import { FamilyList } from '../../../fixed/setup/family/familyList'
import { FormScreen } from '../../../views/FormScreen'
import { ListScreen } from '../../../views/ListScreen'

const base = {
    title: 'Familias',
    endPoint: 'Family',
    list: {
        columns: FamilyList
    },
    form: {
        form: FamilyForm
    }
}
const FamilyRoutes = [
    {
        path: '/setup/items/family',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <ListScreen {...base} />,
        meta: {
            action: 'read',
            resource: 'family'
        }
    },
    {
        path: '/setup/items/family/add',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'insert',
            resource: 'family'
        }
    },
    {
        path: '/setup/items/family/edit/:id',
        exact: true,
        layout: 'VerticalLayout',
        component: () => <FormScreen {...base} />,
        meta: {
            action: 'update',
            resource: 'family'
        }
    }
]

export default FamilyRoutes