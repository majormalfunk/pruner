import { PAGE_HOME, PAGE_ACCOUNT, PAGE_EVENT_CREATE, PAGE_PLAN_CREATE } from '../constants'

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

export const setPagePlanCreate = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_PAGE',
      data: PAGE_PLAN_CREATE
    })
  }
}

const pageReducer = (state = PAGE_HOME, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.data
    default:
      return state
  }
}

export default pageReducer