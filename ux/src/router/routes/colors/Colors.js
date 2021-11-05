
import { ItemsColorScreenList } from '../../../views/items/itemColors/ItemColorsScreemList'
import { ItemsColorsFormScreen } from '../../../views/items/itemColors/ItemsColorFormScreem'

const ColorsRoutes = [
    {
        path: '/items/colors',
        exact: true,
        component: () => <ItemsColorScreenList titulo="Artículos Colores" />,
        meta: {
            action: 'read',
            resource: 'colors'
        }
    },
    {
        path: '/items/colors/add',
        exact: true,
        component: () => <ItemsColorsFormScreen />,
        meta: {
            action: 'insert',
            resource: 'colors'
        }
    },
    {
        path: '/items/colors/edit/:id',
        exact: true,
        component: () => <ItemsColorsFormScreen />,
        meta: {
            action: 'update',
            resource: 'colors'
        }
    }
]

export default ColorsRoutes