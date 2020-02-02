import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import ownEventsReducer from './reducers/ownEventsReducer'
import availableEventsReducer from './reducers/availableEventsReducer'
import pageReducer from './reducers/pageReducer'

const reducer = combineReducers({
  currentUser: userReducer,
  ownEvents: ownEventsReducer,
  availableEvents: availableEventsReducer,
  notification: notificationReducer,
  currentPage: pageReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store