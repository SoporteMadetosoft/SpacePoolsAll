import { calendarTypes } from "../../types/calendar/types"

// ** Initial State
const initialState = {
  events: [],
  selectedEvent: {},
  selectedCalendars: ['Producción', 'Entrega']
}

const calenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case calendarTypes.FetchEvents:
      return { ...state, events: action.events }
    case calendarTypes.AddEvent:
      return { ...state }
    case calendarTypes.RemoveEvent:
      return { ...state }
    case calendarTypes.UpdateEvent:
      return { ...state }
    case calendarTypes.SelectEvent:
      return { ...state, selectedEvent: action.event }
    case calendarTypes.UpdateFilter:
      // ** Updates Filters based on action filter
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.filter)
      if (state.selectedCalendars.includes(action.filter)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.filter)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
      return { ...state }
    case calendarTypes.UpdateAllFilters:
      // ** Updates All Filters based on action value
      const value = action.value
      let selected = []
      if (value === true) {
        selected = ['Producción', 'Entrega']
      } else {
        selected = []
      }
      return { ...state, selectedCalendars: selected }
    default:
      return state
  }
}

export default calenderReducer
