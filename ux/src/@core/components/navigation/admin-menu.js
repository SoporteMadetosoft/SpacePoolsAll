import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faList, faUser, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default [
    {
        id: 'usuariosRoles',
        title: 'Usuarios / Roles',
        icon: <FontAwesomeIcon icon={faUser} />,
        children: [
            {
                id: 'users',
                title: 'Usuarios',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/user'
            },
            {
                id: 'roles',
                title: 'Roles',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/role'
            }
        ]
    },
    {
        id: 'alerts',
        title: 'Alertas',
        icon: <FontAwesomeIcon icon={faExclamationCircle} />,
        navLink: '/alerts'
    },
    {
        id: 'logs',
        title: 'Logs',
        icon: <FontAwesomeIcon icon={faList} />,
        navLink: '/logs'
    }

]