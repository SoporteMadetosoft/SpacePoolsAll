import { PoolScreenList } from '@views/pools/PoolScreenList'
import { PoolFormScreen } from '@views/pools/PoolFormScreen'

const PoolsRoutes = [
    {
        path: '/pools',
        exact: true,
        component: () => <PoolScreenList titulo={'Piscinas'} />,
        meta: {
            action: 'read',
            resource: 'pools'
        }
    },
    {
        path: '/pools/add',
        exact: true,
        component: () => <PoolFormScreen />,
        meta: {
            action: 'insert',
            resource: 'pools'
        }
    },
    {
        path: '/pools/edit/:id',
        exact: true,
        component: () => <PoolFormScreen />,
        meta: {
            action: 'update',
            resource: 'pools'
        }
    }
]

export default PoolsRoutes
