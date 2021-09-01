import { PoolScreenList } from '@views/pools/PoolScreenList'
import { PoolFormScreen } from '@views/pools/PoolFormScreen'

const PoolsRoutes = [
    {
        path: '/pools',
        exact: true,
        component: () => <PoolScreenList titulo={'Piscinas'} />
    },
    {
        path: '/pools/add',
        exact: true,
        component: () => <PoolFormScreen />
    },
    {
        path: '/pools/edit/:id',
        exact: true,
        component: () => <PoolFormScreen />
    }
]

export default PoolsRoutes
