import { Circle } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    id: 'stock',
    title: 'Artículos',
    icon: <FontAwesomeIcon icon={faCube} />,
    children: [
      {
        id: 'items',
        title: 'Artículos',
        icon: <Circle size={12} />,
        navLink: '/items'
      },
      {
        id: 'itemFamily',
        title: 'Familias',
        icon: <Circle size={12} />,
        navLink: '/items/family'
      }
    ]
  }

]
