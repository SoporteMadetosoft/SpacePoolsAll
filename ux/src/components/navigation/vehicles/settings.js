import { Circle } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    id: 'porters',
    title: 'Vehículos',
    icon: <FontAwesomeIcon icon={faTruckMoving} />,
    children: [
      {
        id: 'carriers',
        title: 'Transportistas',
        icon: <Circle size={12} />,
        navLink: '/porters/carriers'
      },
      {
        id: 'vehicles',
        title: 'Vehículos',
        icon: <Circle size={12} />,
        navLink: '/porters/vehicles'
      },
      {
        id: 'trailers',
        title: 'Remolques',
        icon: <Circle size={12} />,
        navLink: '/porters/trailers'
      }
    ]
  }
]
