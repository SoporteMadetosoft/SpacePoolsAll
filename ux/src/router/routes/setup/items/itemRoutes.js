import { ColorsFormScreen } from "../../../../views/setup/items/colors/ColorsFormScreen"
import { ColorsScreenList } from "../../../../views/setup/items/colors/ColorsListScreen"
import { PlaceFormScreen } from "../../../../views/setup/items/place/PlaceFormScreen"
import { PlaceScreenList } from "../../../../views/setup/items/place/PlaceListScreen"


const itemRoutes = [
  {
    path: '/setup/items/place',
    exact: true,
    component: () => <PlaceScreenList titulo={'Ubicaciones'} />,
    meta: {
      action: 'read',
      resource: 'place'
    }
  },
  {
    path: '/setup/items/place/add',
    exact: true,
    component: () => <PlaceFormScreen />,
    meta: {
      action: 'insert',
      resource: 'place'
    }
  },
  {
    path: '/setup/items/place/edit/:id',
    exact: true,
    component: () => <PlaceFormScreen />,
    meta: {
      action: 'update',
      resource: 'place'
    }
  },
  {
    path: '/setup/items/colors',
    exact: true,
    component: () => <ColorsScreenList titulo={'Colores'} />,
    meta: {
      action: 'read',
      resource: 'colors'
    }
  },
  {
    path: '/setup/items/colors/add',
    exact: true,
    component: () => <ColorsFormScreen />,
    meta: {
      action: 'insert',
      resource: 'colors'
    }
  },
  {
    path: '/setup/items/colors/edit/:id',
    exact: true,
    component: () => <ColorsFormScreen />,
    meta: {
      action: 'update',
      resource: 'colors'
    }
  }
]

export default itemRoutes
