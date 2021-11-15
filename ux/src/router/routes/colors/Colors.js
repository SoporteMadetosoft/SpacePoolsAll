import {ItemsColorScreenList} from '../../../views/items/itemColors/ItemColorsScreemList'
import {ItemsColorsFormScreen} from '../../../views/items/itemColors/ItemsColorFormScreem'

const ColorsRoutes = [
    {
        path: '/items/itemColors',
        exact: true,
        component: () => <ItemsColorScreenList titulo="Artículos Colores" />,
        meta: {
            action: 'read',
            resource: 'itemColors'
        }
    },
    {
        path: '/items/itemColors/add',
        exact: true,
        component: () => <ItemsColorsFormScreen />,
        meta: {
            action: 'insert',
            resource: 'itemColors'
        }
    },
    {
        path: '/items/itemColors/edit/:id',
        exact: true,
        component: () => <ItemsColorsFormScreen />,
        meta: {
            action: 'update',
            resource: 'itemColors'
        }
    }
]

export default ColorsRoutes