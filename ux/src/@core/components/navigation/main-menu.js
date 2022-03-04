import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCar, faCircleNotch, faExclamationTriangle, faHandHoldingUsd, faHandshake, faHospital, faHospitalUser, faProjectDiagram, faRoute, faSyringe, faToolbox } from '@fortawesome/free-solid-svg-icons'

export default [
    {
        id: 'mutuas',
        title: 'Mutuas',
        icon: <FontAwesomeIcon icon={faHandshake} />,
        navLink: '/mutua'
    },
    {
        id: 'centers',
        title: 'Centros',
        icon: <FontAwesomeIcon icon={faHospital} />,
        navLink: '/center'
    },
    {
        id: 'doctors',
        title: 'Doctores',
        icon: <FontAwesomeIcon icon={faHospitalUser} />,
        navLink: '/doctor'
    },
    {
        id: 'procedures',
        title: 'Procedimientos',
        icon: <FontAwesomeIcon icon={faProjectDiagram} />,
        navLink: '/procedure'
    },
    {
        id: 'stock',
        title: 'Stock',
        icon: <FontAwesomeIcon icon={faToolbox} />,
        children: [
            {
                id: 'materials',
                title: 'M. consumibles',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/stock/materials'
            },
            {
                id: 'instruments',
                title: 'Instrumentos',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/stock/instruments'
            },
            {
                id: 'instrumentals',
                title: 'Instrumentales',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/stock/instrumentals'
            },
            {
                id: 'sheets',
                title: 'Fichas',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/stock/sheets'
            }
        ]
    },
    {
        id: 'surgery',
        title: 'Cirugías',
        icon: <FontAwesomeIcon icon={faSyringe} />,
        navLink: '/surgery'
    },
    {
        id: 'calendar',
        title: 'Calendario',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        navLink: '/calendar'
    },
    {
        id: 'vehicles',
        title: 'Vehículos',
        icon: <FontAwesomeIcon icon={faCar} />,
        navLink: '/vehicles'
    },
    {
        id: 'routes',
        title: 'Rutas',
        icon: <FontAwesomeIcon icon={faRoute} />,
        navLink: '/routes'
    },
    {
        id: 'gestion',
        title: 'Gestión',
        icon: <FontAwesomeIcon icon={faHandHoldingUsd} />,
        children: [
            {
                id: 'loans',
                title: 'Préstamos',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/loans'
            },
            {
                id: 'deposits',
                title: 'Depósitos',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/deposits'
            },
            {
                id: 'sales',
                title: 'Ventas',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/sales'
            },
            {
                id: 'deliveryNote',
                title: 'Albaranes',
                icon: <FontAwesomeIcon icon={faCircleNotch} />,
                navLink: '/delivery-note'
            }
        ]
    },
    {
        id: 'incidences',
        title: 'Incidencias',
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
        navLink: '/incidences'
    }
]