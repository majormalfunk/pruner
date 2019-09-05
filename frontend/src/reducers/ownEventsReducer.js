export const setOwnEvents = (ownEvents) => {
  return async dispatch => {
    dispatch({
      type: 'SET_OWN_EVENTS',
      data: ownEvents
    })
  }
}

export const clearOwnEvents = () => {
  return {
    type: 'CLEAR_OWN_EVENTS'
  }
}

const ownEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWN_EVENTS':
      return action.data
    case 'CLEAR_OWN_EVENTS':
      return []
    default:
      return state
  }
}

export default ownEventsReducer