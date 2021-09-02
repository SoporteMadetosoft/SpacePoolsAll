import { CustomerScreenList } from '@views/customers/CustomerScreenList'
import { CustomerFormScreen } from '@views/customers/CustomerFormScreen'
import { ItemsFamilyScreenList } from '../../../views/itemsFamily/ItemsFamilyScreenList'
import { ItemsFamilyFormScreen } from '../../../views/itemsFamily/ItemsFamilyFormScreen'

const ItemsRoutes = [

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
