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

export const addShowToOwnEvents = (eventId, createdShow) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_SHOW_TO_OWN_EVENTS',
      data: {
        eventId: eventId,
        createdShow: createdShow
      }
    })
  }
}

export const updateShowInOwnEvents = (eventId, updatedShow) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_SHOW_IN_OWN_EVENTS',
      data: {
        eventId: eventId,
        updatedShow: updatedShow
      }
    })
  }
}

export const removeShowFromOwnEvents = (eventId, id) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_SHOW_FROM_OWN_EVENTS',
      data: {
        eventId: eventId,
        id: id
      }
    })
  }
}

export const addEntryToOwnEvents = (eventId, createdEntry) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_ENTRY_TO_OWN_EVENTS',
      data: {
        eventId: eventId,
        createdEntry: createdEntry
      }
    })
  }
}

export const updateEntryInOwnEvents = (eventId, updatedEntry) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_ENTRY_IN_OWN_EVENTS',
      data: {
        eventId: eventId,
        updatedEntry: updatedEntry
      }
    })
  }
}

export const removeEntryFromOwnEvents = (eventId, id) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_ENTRY_FROM_OWN_EVENTS',
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
        return event
      })
    case 'REMOVE_RECURRENCE_FROM_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newRecurrences = event.recurrences.filter(recurrence => recurrence.id !== action.data.id)
        event.recurrences = newRecurrences
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
        const newEntries = event.entries.map((entry) => {
          if (entry.venue.id === action.data.updatedVenue.id) {
            entry.venue = action.data.updatedVenue
          }
          return entry
        })
        event.entries = newEntries
        return event
      })
    case 'REMOVE_VENUE_FROM_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newVenues = event.venues.filter(venue => venue.id !== action.data.id)
        event.venues = newVenues
        return event
      })
    case 'ADD_SHOW_TO_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        event.shows.push(action.data.createdShow)
        return event
      })
    case 'UPDATE_SHOW_IN_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newShows = event.shows.map((show) => {
          return (show.id === action.data.updatedShow.id ? action.data.updatedShow : show)
        })
        event.shows = newShows
        const newEntries = event.entries.map((entry) => {
          if (entry.show.id === action.data.updatedShow.id) {
            entry.show = action.data.updatedShow
          }
          return entry
        })
        event.entries = newEntries
        return event
      })
    case 'REMOVE_SHOW_FROM_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newShows = event.shows.filter(show => show.id !== action.data.id)
        event.shows = newShows
        return event
      })
    case 'ADD_ENTRY_TO_OWN_EVENTS':
        return state.map((event) => {
          if (event.id !== action.data.eventId) {
            return event
          }
          event.entries.push(action.data.createdEntry)
          console.log('Event in reducer', event)
          return event
        })
    case 'UPDATE_ENTRY_IN_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newEntries = event.entries.map((entry) => {
          return (entry.id === action.data.updatedEntry.id ? action.data.updatedEntry : entry)
        })
        event.entries = newEntries
        console.log('Event in reducer', event)
        return event
      })
    case 'REMOVE_ENTRY_FROM_OWN_EVENTS':
      return state.map((event) => {
        if (event.id !== action.data.eventId) {
          return event
        }
        const newEntries = event.entries.filter(entry => entry.id !== action.data.id)
        event.entries = newEntries
        console.log('Event in reducer', event)
        return event
      })
    default:
      return state
  }
}

export default ownEventsReducer