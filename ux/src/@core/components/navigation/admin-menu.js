import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faList, faUser } from '@fortawesome/free-solid-svg-icons'

export default [
    {
        id: 'users',
        title: 'Usuarios',
        icon: <FontAwesomeIcon icon={faUser} />,
        navLink: '/user'
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