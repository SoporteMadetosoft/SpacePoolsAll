import { Circle } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faUser, faBoxes, faTruckMoving, faCube, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    id: 'setup',
    title: 'Configuración',
    icon: <FontAwesomeIcon icon={faCogs} />,
    children: [
      {
        id: 'sCenters',
        title: 'Centros',
        icon: <FontAwesomeIcon icon={faArrowsAlt} />,
        children: [
          {
            id: 'sSales-org',
            title: 'Organización de ventas',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/sales-org'
          },
          {
            id: 'sConditional-org',
            title: 'Organización condicional',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/conditional-org'
          },
          {
            id: 'sDeposit-org',
            title: 'Organización de depósitos',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/deposit-org'
          },
          {
            id: 'sZone',
            title: 'Zonas',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/zone'
          }
        ]
      },
      {
        id: 'sProcedures',
        title: 'Procedimientos',
        icon: <FontAwesomeIcon icon={faUser} />,
        children: [
          {
            id: 'sProcedure-family',
            title: 'Familias del procedimiento',
            icon: <Circle size={12} />,
            navLink: '/setup/procedures/procedure-family'
          }
        ]
      },
      {
        id: 'sItems',
        title: 'Artículos',
        icon: <FontAwesomeIcon icon={faBoxes} />,
        children: [
          {
            id: 'sFamily',
            title: 'Familias',
            icon: <Circle size={12} />,
            navLink: '/setup/items/family'
          }
        ]
      },
      {
        id: 'sIncidences',
        title: 'Incidencias',
        icon: <FontAwesomeIcon icon={faTruckMoving} />,
        children: [
          {
            id: 'sIncidence-type',
            title: 'Tipo de incidencia',
            icon: <Circle size={12} />,
            navLink: '/setup/incidences/incidence-type'
          },
          {
            id: 'sReason',
            title: 'Motivo',
            icon: <Circle size={12} />,
            navLink: '/setup/incidences/incidence-reason'
          }
        ]
      },
      {
        id: 'sLoans',
        title: 'Préstamos',
        icon: <FontAwesomeIcon icon={faCube} />,
        children: [
          {
            id: 'sLoan-type',
            title: 'Ubicaciones',
            icon: <Circle size={12} />,
            navLink: '/setup/loans/loan-type'
          }
        ]
      },
      {
        id: 'sVehicles',
        title: 'Vahículos',
        icon: <FontAwesomeIcon icon={faCube} />,
        children: [
          {
            id: 'sBrand',
            title: 'Marca',
            icon: <Circle size={12} />,
            navLink: '/setup/vehicles/brand'
          },
          {
            id: 'sModel',
            title: 'Modelo',
            icon: <Circle size={12} />,
            navLink: '/setup/vehicles/model'
          }
        ]
      }
    ]
  }
]