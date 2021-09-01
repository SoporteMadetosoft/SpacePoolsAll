import { Box, Circle, Settings, Users, Package, AlertCircle } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faUser, faBoxes, faTruckMoving, faCube, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    id: 'setup',
    title: 'Configuración',
    icon: <FontAwesomeIcon icon={faCogs} />,
    children: [
      {
        id: 'general',
        title: 'General',
        icon: <FontAwesomeIcon icon={faArrowsAlt} />,
        children: [
          {
            id: 'paymentMethods',
            title: 'Métodos de pago',
            icon: <Circle size={12} />,
            navLink: '/setup/general/paymentMethods'
          },
          {
            id: 'departments',
            title: 'Departamentos',
            icon: <Circle size={12} />,
            navLink: '/setup/general/departments'
          },
          {
            id: 'addressesTypes',
            title: 'Tipos de direcciones',
            icon: <Circle size={12} />,
            navLink: '/setup/general/addressesTypes'
          }
        ]
      },
      {
        id: 'customer',
        title: 'Clientes',
        icon: <FontAwesomeIcon icon={faUser} />,
        children: [
          {
            id: 'customerType',
            title: 'Tipos de cliente',
            icon: <Circle size={12} />,
            navLink: '/setup/customer/customerType'
          },
          {
            id: 'customerCategory',
            title: 'Categorias de cliente',
            icon: <Circle size={12} />,
            navLink: '/setup/customer/category'
          },
          {
            id: 'activity',
            title: 'Actividades',
            icon: <Circle size={12} />,
            navLink: '/setup/customer/activity'
          },
          {
            id: 'origin',
            title: 'Origenes',
            icon: <Circle size={12} />,
            navLink: '/setup/customer/origin'
          }
        ]
      },
      {
        id: 'vendors',
        title: 'Proveedores',
        icon: <FontAwesomeIcon icon={faBoxes} />,
        children: [
          {
            id: 'vendorType',
            title: 'Tipos de vendedor',
            icon: <Circle size={12} />,
            navLink: '/setup/vendors/vendorType'
          }
        ]
      },
      {
        id: 'vehicles',
        title: 'Vehiculos',
        icon: <FontAwesomeIcon icon={faTruckMoving} />,
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
      },
      {
        id: 'items',
        title: 'Artículos',
        icon: <FontAwesomeIcon icon={faCube} />,
        children: [
          {
            id: 'place',
            title: 'Ubicaciones',
            icon: <Circle size={12} />,
            navLink: '/setup/items/place'
          }
        ]
      }


    ]
  }
]