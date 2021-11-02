import { ItemsFamilyFormScreen } from '../../../views/itemsFamily/ItemsFamilyFormScreen'
import { ItemsFamilyScreenList } from '../../../views/itemsFamily/ItemsFamilyScreenList'

const FamilyRoutes = [
    {
        path: '/items/family',
        exact: true,
        component: () => <ItemsFamilyScreenList titulo="Familias" />,
        meta: {
            action: 'read',
            resource: 'family'
        }
    },
    {
        path: '/items/family/add',
        exact: true,
        component: () => <ItemsFamilyFormScreen />,
        meta: {
            action: 'insert',
            resource: 'family'
        }
    },
    {
        path: '/items/family/edit/:id',
        exact: true,
        component: () => <ItemsFamilyFormScreen />,
        meta: {
            action: 'update',
            resource: 'family'
        }
    }
]

export default FamilyRoutes
