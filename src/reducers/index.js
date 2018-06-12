import { combineReducers } from 'redux'
import { LoadingReducer } from '_reducers/LoadingReducer'
import { AlertReducer } from '_reducers/AlertReducer'

export default combineReducers({
  isLoading: LoadingReducer,
  alert: AlertReducer,
})