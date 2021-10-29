import { TrailersFormScreen } from '@views/trailers/TrailersFormScreen'
import { TrailersListScreen } from '@views/trailers/TrailersListScreen'


const TrailersRoutes = [
  {
    path: '/porters/trailers',
    exact: true,
    component: () => <TrailersListScreen titulo={'Remolques'} />,
    meta: {
      action: 'read',
      resource: 'trailers'
    }
  },
  {
    path: '/porters/trailers/add',
    exact: true,
    component: () => <TrailersFormScreen />,
    meta: {
      action: 'insert',
      resource: 'trailers'
    }
  },
  {
    path: '/porters/trailers/edit/:id',
    exact: true,
    component: () => <TrailersFormScreen />,
    meta: {
      action: 'update',
      resource: 'trailers'
    }
  }
]

export default TrailersRoutes
