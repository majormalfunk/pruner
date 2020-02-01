import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import ownEventsReducer from './reducers/ownEventsReducer'
import pageReducer from './reducers/pageReducer'

const reducer = combineReducers({
  currentUser: userReducer,
  ownEvents: ownEventsReducer,
  notification: notificationReducer,
  currentPage: pageReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store