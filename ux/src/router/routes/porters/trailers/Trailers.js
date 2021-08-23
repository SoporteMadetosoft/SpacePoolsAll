import { TrailersFormScreen } from '@views/trailers/TrailersFormScreen'
import { TrailersListScreen } from '@views/trailers/TrailersListScreen'


const TrailersRoutes = [
  {
    path: '/porters/trailers',
    exact: true,
    component: () => <TrailersListScreen titulo={'Remolques'} />
  },
  {
    path: '/porters/trailers/add',
    exact: true,
    component: () => <TrailersFormScreen />
  },
  {
    path: '/porters/trailers/edit/:id',
    exact: true,
    component: () => <TrailersFormScreen />
  }
]

export default TrailersRoutes
