export const setAvailableEvents = (availableEvents) => {
  return async dispatch => {
    dispatch({
      type: 'SET_AVAILABLE_EVENTS',
      data: availableEvents
    })
  }
}

export const clearAvailableEvents = () => {
  return {
    type: 'CLEAR_AVAILABLE_EVENTS'
  }
}

const availableEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_EVENTS':
      return action.data
    case 'CLEAR_AVAILABLE_EVENTS':
      return []
    default:
      return state
  }
}

export default availableEventsReducer