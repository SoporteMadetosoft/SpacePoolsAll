import { Circle } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    id: 'usersRoles',
    title: 'Usuarios / Roles',
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    children: [
      {
        id: 'users',
        title: 'Usuarios',
        icon: <Circle size={12} />,
        navLink: '/users'
      },
      {
        id: 'roles',
        title: 'Roles',
        icon: <Circle size={12} />,
        navLink: '/roles'
      }
    ]
  }

]
