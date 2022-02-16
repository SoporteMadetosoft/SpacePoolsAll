import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

export default [
    {
        id: 'users',
        title: 'Usuarios',
        icon: <FontAwesomeIcon icon={faCogs} />,
        navLink: '/users'
    },
    {
        id: 'alerts',
        title: 'Alertas',
        icon: <FontAwesomeIcon icon={faCogs} />,
        navLink: '/alerts'
    },
    {
        id: 'logs',
        title: 'Logs',
        icon: <FontAwesomeIcon icon={faCogs} />,
        navLink: '/logs'
    }

]