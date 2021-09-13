import { CalendarScreen } from '@views/calendar/CalendarScreen'

const CalendarRoutes = [
    {
      path: '/calendar',
      exact: true,
      component: () => <CalendarScreen titulo={'Calendario'} />
    }
  ]
  
  export default CalendarRoutes
  