import { LogsListScreen } from "../../../views/logs/LogsListScreen"


const LogsRoutes = [
  {
    path: '/logs',
    exact: true,
    component: () => <LogsListScreen titulo={'Logs'} />,
    meta: {
      action: 'read',
      resource: 'logs'
    }
  }
]

export default LogsRoutes