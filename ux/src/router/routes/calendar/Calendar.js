import CalendarComponent from "../../../views/calendar"

const CalendarRoutes = [
  {
    path: '/calendar',
    exact: true,
    component: () => <CalendarComponent />,
    meta: {
      action: 'read',
      resource: 'calendar'
    }
  }
]

export default CalendarRoutes
