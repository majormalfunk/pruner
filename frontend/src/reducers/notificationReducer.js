import { NOTIF_SUCCESS, NOTIF_INFO, NOTIF_WARNING } from '../constants'

export const displaySuccess = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        messageClass: NOTIF_SUCCESS
      }
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, (5000))
  }
}

export const displayInfo = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        messageClass: NOTIF_INFO
      }
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, (5000))
  }
}

export const displayError = (error) => {
  let message = 'Unknown error occured.'
  if (error.message) {
    console.log(error.message)
    message = error.message.replace('GraphQL error:', '')
  } else {
    console.log(error)
    message = error
  }
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        messageClass: NOTIF_WARNING
      }
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, (5000))
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const notificationReducer = (state = { message: '', messageClass: 'info' }, action) => {
  console.log('Reducer switch, action:', action.type)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default notificationReducer