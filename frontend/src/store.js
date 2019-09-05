import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import ownEventsReducer from './reducers/ownEventsReducer'

const reducer = combineReducers({
  user: userReducer,
  ownEvents: ownEventsReducer,
  notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store