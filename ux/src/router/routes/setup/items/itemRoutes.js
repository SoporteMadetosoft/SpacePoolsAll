import { ColorsFormScreen } from "../../../../views/setup/items/colors/ColorsFormScreen"
import { ColorsScreenList } from "../../../../views/setup/items/colors/ColorsListScreen"
import { PlaceFormScreen } from "../../../../views/setup/items/place/PlaceFormScreen"
import { PlaceScreenList } from "../../../../views/setup/items/place/PlaceListScreen"


const itemRoutes = [
  {
    path: '/setup/items/place',
    exact: true,
    component: () => <PlaceScreenList titulo={'Ubicaciones'} />
  },
  {
    path: '/setup/items/place/add',
    exact: true,
    component: () => <PlaceFormScreen />
  },
  {
    path: '/setup/items/place/edit/:id',
    exact: true,
    component: () => <PlaceFormScreen />
  },
  {
    path: '/setup/items/colors',
    exact: true,
    component: () => <ColorsScreenList titulo={'Colores'} />
  },
  {
    path: '/setup/items/colors/add',
    exact: true,
    component: () => <ColorsFormScreen />
  },
  {
    path: '/setup/items/colors/edit/:id',
    exact: true,
    component: () => <ColorsFormScreen />
  }
]

export default itemRoutes
