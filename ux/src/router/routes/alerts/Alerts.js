import { AlertsListScreen } from '@views/alerts/AlertsListScreen'


const AlertsRoutes = [
  {
    path: '/alerts',
    exact: true,
    component: () => <AlertsListScreen titulo={'Alertas'} />,
    meta: {
      action: 'read',
      resource: 'alerts'
    }
  }
] 

export default AlertsRoutes