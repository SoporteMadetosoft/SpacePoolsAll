import axios from 'axios'
import { getEvents } from '../../../utility/helpers/Axios/getEvents'
import { calendarTypes } from '../../types/calendar/types'

// ** Fetch Events
export const fetchEvents = (calendars) => {
  return async dispatch => {
    await getEvents('Calendar', calendars).then(data => {
      dispatch({
        type: calendarTypes.FetchEvents,
        events: data
      })
    })
  }
}

// ** Add Event
export const addEvent = event => {
  return (dispatch, getState) => {
    axios.post('/apps/calendar/add-event', { event }).then(() => {
      dispatch({
        type: calendarTypes.AddEvent
      })
      dispatch(fetchEvents(getState().calenderReducer.selectedCalendars))
    })
  }
}

// ** Update Event
export const updateEvent = event => {
  return dispatch => {
    axios.post('/apps/calendar/update-event', { event }).then(() => {
      dispatch({
        type: calendarTypes.UpdateEvent
      })
    })
  }
}

// ** Filter Events
export const updateFilter = filter => {
  return (dispatch, getState) => {
    dispatch({
      type: calendarTypes.UpdateFilter,
      filter
    })
    dispatch(fetchEvents(getState().calenderReducer.selectedCalendars))
  }
}

// ** Add/Remove All Filters
export const updateAllFilters = value => {
  return (dispatch, getState) => {
    dispatch({
      type: calendarTypes.UpdateAllFilters,
      value
    })
    dispatch(fetchEvents(getState().calenderReducer.selectedCalendars))
  }
}

// ** remove Event
export const removeEvent = id => {
  return dispatch => {
    axios.delete('/apps/calendar/remove-event', { id }).then(() => {
      dispatch({
        type: calendarTypes.RemoveEvent
      })
    })
  }
}

// ** Select Event (get event data on click)
export const selectEvent = event => {
  return dispatch => {
    dispatch({
      type: calendarTypes.SelectEvent,
      event
    })
  }
}
