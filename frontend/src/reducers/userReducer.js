
export const setCurrentUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_CURRENT_USER',
      data: user
    })
  }
}

export const clearCurrentUser = () => {
  return {
    type: 'CLEAR_CURRENT_USER'
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.data
    case 'CLEAR_CURRENT_USER':
      return null
    default:
      return state
  }
}

export default userReducer