import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faBoxes, faCircleNotch, faBorderAll, faHospital, faProjectDiagram, faExclamationTriangle, faHandHoldingUsd, faCar } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    id: 'setup',
    title: 'Configuración',
    icon: <FontAwesomeIcon icon={faCogs} />,
    children: [
      {
        id: 'sGeneral',
        title: 'General',
        icon: <FontAwesomeIcon icon={faBorderAll} />,
        children: [
          {
            id: 'addressType',
            title: 'Tipos de dirección',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/general/address-type'
          },
          {
            id: 'department',
            title: 'Departamentos',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/general/department'
          }
        ]
      },
      {
        id: 'sCenters',
        title: 'Centros',
        icon: <FontAwesomeIcon icon={faHospital} />,
        children: [
          {
            id: 'salesOrg',
            title: 'Org. de ventas',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/centers/sales-org'
          },
          {
            id: 'conditionalOrg',
            title: 'Org. condicional',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/centers/conditional-org'
          },
          {
            id: 'depositOrg',
            title: 'Org. de depósitos',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/centers/deposit-org'
          },
          {
            id: 'zone',
            title: 'Zonas',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/centers/zone'
          }
        ]
      },
      {
        id: 'sProcedures',
        title: 'Procedimientos',
        icon: <FontAwesomeIcon icon={faProjectDiagram} />,
        children: [
          {
            id: 'procedureFamily',
            title: 'Familias del procedimiento',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
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
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/items/family'
          }
        ]
      },
      {
        id: 'sIncidences',
        title: 'Incidencias',
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
        children: [
          {
            id: 'incidenceType',
            title: 'Tipos de incidencia',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/incidences/incidence-type'
          },
          {
            id: 'incidenceReason',
            title: 'Motivos',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/incidences/incidence-reason'
          }
        ]
      },
      {
        id: 'sLoans',
        title: 'Préstamos',
        icon: <FontAwesomeIcon icon={faHandHoldingUsd} />,
        children: [
          {
            id: 'loanType',
            title: 'Tipos de préstamo',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/loans/loan-type'
          }
        ]
      },
      {
        id: 'sVehicles',
        title: 'Vahículos',
        icon: <FontAwesomeIcon icon={faCar} />,
        children: [
          {
            id: 'brand',
            title: 'Marcas',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/vehicles/brand'
          },
          {
            id: 'model',
            title: 'Modelos',
            icon: <FontAwesomeIcon icon={faCircleNotch} />,
            navLink: '/setup/vehicles/model'
          }
        ]
      }
    ]
  }
]