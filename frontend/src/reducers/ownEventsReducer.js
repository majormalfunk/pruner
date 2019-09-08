export const setOwnEvents = (ownEvents) => {
  return async dispatch => {
    dispatch({
      type: 'SET_OWN_EVENTS',
      data: ownEvents
    })
  }
}

export const addToOwnEvents = (newEvent) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_TO_OWN_EVENTS',
      data: newEvent
    })
  }
}

export const updateInOwnEvents = (updatedEvent) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_IN_OWN_EVENTS',
      data: updatedEvent
    })
  }
}

export const removeFromOwnEvents = (oldEvent) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_FROM_OWN_EVENTS',
      data: oldEvent
    })
  }
}

export const clearOwnEvents = () => {
  return {
    type: 'CLEAR_OWN_EVENTS'
  }
}

export const updateRecurrenceInOwnEvents = (updatedRecurrence, eventId) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_RECURRENCE_IN_OWN_EVENTS',
      data: {
        updatedRecurrence: updatedRecurrence,
        eventId: eventId
      }
    })
  }
}

export const removeRecurrenceFromOwnEvents = (removebaleRecurrence, eventId) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_RECURRENCE_FROM_OWN_EVENTS',
      data: {
        removebaleRecurrence: removebaleRecurrence,
        eventId: eventId
      }
    })
  }
}

const ownEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWN_EVENTS':
      return action.data
    case 'ADD_TO_OWN_EVENTS':
      return [...state, action.data]
    case 'UPDATE_IN_OWN_EVENTS':
      return state.map((event) => {
        return (event.id === action.data.id ? action.data : event)
      })
    case 'REMOVE_FROM_OWN_EVENTS':
      return state.filter(event => event.id !== action.data.id)
    case 'CLEAR_OWN_EVENTS':
      return []
    case 'UPDATE_RECURRENCE_IN_OWN_EVENTS':
      console.log('updatedRecurrence', action.data.updatedRecurrence)
      console.log('eventId:', action.data.eventId)
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        return event.recurrences.map((recurrence) => {
          return (recurrence.id === action.data.updatedRecurrence.id ? action.data.updatedRecurrence : recurrence)
        })
      })
    case 'REMOVE_RECURRENCE_FROM_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        return event.recurrences.filter(recurrence => recurrence.id !== action.data.updatedRecurrence.id)
      })
    default:
      return state
  }
}

export default ownEventsReducer