import CalendarComponent from "../../../views/calendar"

const CalendarRoutes = [
  {
    path: '/calendar',
    exact: true,
    component: () => <CalendarComponent titulo={'Calendario'} />
  }
]

export default CalendarRoutes
