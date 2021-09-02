import { ItemsFamilyScreenList } from '../../../views/itemsFamily/ItemsFamilyScreenList'
import { ItemsFamilyFormScreen } from '../../../views/itemsFamily/ItemsFamilyFormScreen'
import { ItemScreenList } from '../../../views/items/ItemScreenList'
import { ItemFormScreen } from '../../../views/items/ItemFormScreen'

const ItemsRoutes = [
    {
        path: '/items',
        exact: true,
        component: () => <ItemScreenList titulo={'Artículos'} />
    },
    {
        path: '/items/add',
        exact: true,
        component: () => <ItemFormScreen />
    },
    {
        path: '/items/edit/:id',
        exact: true,
        component: () => <ItemFormScreen />
    },
    {
        path: '/items/family',
        exact: true,
        component: () => <ItemsFamilyScreenList titulo="Familias" />
    },
    {
        path: '/items/family/add',
        exact: true,
        component: () => <ItemsFamilyFormScreen />
    },
    {
        path: '/items/family/edit/:id',
        exact: true,
        component: () => <ItemsFamilyFormScreen />
    }
]

export default ItemsRoutes
