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
        id: 'sGeneral',
        title: 'General',
        icon: <FontAwesomeIcon icon={faArrowsAlt} />,
        children: [
          {
            id: 'addressType',
            title: 'Tipos de dirección',
            icon: <Circle size={12} />,
            navLink: '/setup/general/address-type'
          },
          {
            id: 'department',
            title: 'Departamentos',
            icon: <Circle size={12} />,
            navLink: '/setup/general/department'
          }
        ]
      },
      {
        id: 'sCenters',
        title: 'Centros',
        icon: <FontAwesomeIcon icon={faArrowsAlt} />,
        children: [
          {
            id: 'salesOrg',
            title: 'Organización de ventas',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/sales-org'
          },
          {
            id: 'conditionalOrg',
            title: 'Organización condicional',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/conditional-org'
          },
          {
            id: 'depositOrg',
            title: 'Organización de depósitos',
            icon: <Circle size={12} />,
            navLink: '/setup/centers/deposit-org'
          },
          {
            id: 'zone',
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
            id: 'procedureFamily',
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
            id: 'family',
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
            id: 'incidenceType',
            title: 'Tipos de incidencia',
            icon: <Circle size={12} />,
            navLink: '/setup/incidences/incidence-type'
          },
          {
            id: 'incidenceReason',
            title: 'Motivos',
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
            id: 'loanType',
            title: 'Tipos de préstamo',
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
            id: 'brand',
            title: 'Marcas',
            icon: <Circle size={12} />,
            navLink: '/setup/vehicles/brand'
          },
          {
            id: 'model',
            title: 'Modelos',
            icon: <Circle size={12} />,
            navLink: '/setup/vehicles/model'
          }
        ]
      }
    ]
  }
]