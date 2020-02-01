import { PAGE_HOME, PAGE_ACCOUNT, PAGE_EVENT_CREATE } from '../constants'

//export const PAGE_CREATE_ACCOUNT = "page-create-account"
//export const PAGE_LOGIN = "page-login"
//export const PAGE_EVENT = "page-event"

export const setPageHome = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_PAGE',
      data: PAGE_HOME
    })
  }
}

export const setPageAccount = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_PAGE',
      data: PAGE_ACCOUNT
    })
  }
}

export const setPageEventCreate = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_PAGE',
      data: PAGE_EVENT_CREATE
    })
  }
}

const pageReducer = (state = PAGE_HOME, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      console.log('Setting page to', action.data)
      return action.data
    default:
      return state
  }
}

export default pageReducer