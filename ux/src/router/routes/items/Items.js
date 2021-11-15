import { ItemScreenList } from '../../../views/items/ItemScreenList'
import { ItemFormScreen } from '../../../views/items/ItemFormScreen'

const ItemsRoutes = [
    {
        path: '/items',
        exact: true,
        component: () => <ItemScreenList titulo={'Artículos'} />,
        meta: {
            action: 'read',
            resource: 'items'
        }
    },
    {
        path: '/items/add',
        exact: true,
        component: () => <ItemFormScreen />,
        meta: {
            action: 'insert',
            resource: 'items'
        }
    },
    {
        path: '/items/edit/:id',
        exact: true,
        component: () => <ItemFormScreen />,
        meta: {
            action: 'update',
            resource: 'items'
        }
    }
]

export default ItemsRoutes
