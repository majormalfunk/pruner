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

export const addRecurrenceToOwnEvents = (eventId, createdRecurrence) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_RECURRENCE_TO_OWN_EVENTS',
      data: {
        eventId: eventId,
        createdRecurrence: createdRecurrence
      }
    })
  }
}

export const updateRecurrenceInOwnEvents = (eventId, updatedRecurrence) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_RECURRENCE_IN_OWN_EVENTS',
      data: {
        eventId: eventId,
        updatedRecurrence: updatedRecurrence
      }
    })
  }
}

export const removeRecurrenceFromOwnEvents = (eventId, id) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_RECURRENCE_FROM_OWN_EVENTS',
      data: {
        eventId: eventId,
        id: id
      }
    })
  }
}

export const addVenueToOwnEvents = (eventId, createdVenue) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_VENUE_TO_OWN_EVENTS',
      data: {
        eventId: eventId,
        createdVenue: createdVenue
      }
    })
  }
}

export const updateVenueInOwnEvents = (eventId, updatedVenue) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_VENUE_IN_OWN_EVENTS',
      data: {
        eventId: eventId,
        updatedVenue: updatedVenue
      }
    })
  }
}

export const removeVenueFromOwnEvents = (eventId, id) => {
  console.log('Reducer removing venue', id)
  return async dispatch => {
    dispatch({
      type: 'REMOVE_VENUE_FROM_OWN_EVENTS',
      data: {
        eventId: eventId,
        id: id
      }
    })
  }
}

const ownEventsReducer = (state = [], action) => {
  console.log('Reducer switch, action:', action.type)
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
    case 'ADD_RECURRENCE_TO_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        event.recurrences.push(action.data.createdRecurrence)
        return event
      })
    case 'UPDATE_RECURRENCE_IN_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newRecurrences = event.recurrences.map((recurrence) => {
          return (recurrence.id === action.data.updatedRecurrence.id ? action.data.updatedRecurrence : recurrence)
        })
        event.recurrences = newRecurrences
        console.log('Event in reducer', event)
        return event
      })
    case 'REMOVE_RECURRENCE_FROM_OWN_EVENTS':
      console.log('CASE: ', action.type)
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newRecurrences = event.recurrences.filter(recurrence => recurrence.id !== action.data.id)
        event.recurrences = newRecurrences
        console.log('Event in reducer', event)
        return event
      })
    case 'ADD_VENUE_TO_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        event.venues.push(action.data.createdVenue)
        return event
      })
    case 'UPDATE_VENUE_IN_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newVenues = event.venues.map((venue) => {
          return (venue.id === action.data.updatedVenue.id ? action.data.updatedVenue : venue)
        })
        event.venues = newVenues
        console.log('Event in reducer', event)
        return event
      })
    case 'REMOVE_VENUE_FROM_OWN_EVENTS':
      console.log('CASE: ', action.type)
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newVenues = event.venues.filter(venue => venue.id !== action.data.id)
        event.venues = newVenues
        console.log('Event in reducer', event)
        return event
      })
    default:
      return state
  }
}

export default ownEventsReducer