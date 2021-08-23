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
  }
]

export default itemRoutes
