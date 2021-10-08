import { TrailersFormScreen } from '@views/trailers/TrailersFormScreen'
import { TrailerReparationFormScreen } from '../../../../views/tReparation/TrailerReparationFormScreen'
import { TrailerReparationListScreen } from '../../../../views/tReparation/TrailerReparationListScreen'


const TrailerReparationRoutes = [
    {
        path: '/porters/trailers/tReparation/:id',
        exact: true,
        component: () => <TrailerReparationListScreen titulo={'Reparaciones'} />
    },
    {
        path: '/porters/trailers/tReparation/:index/add',
        exact: true,
        component: () => <TrailerReparationFormScreen />
    },
    {
        path: '/porters/trailers/tReparation/:index/edit/:id',
        exact: true,
        component: () => <TrailerReparationFormScreen />
    }
]

export default TrailerReparationRoutes
