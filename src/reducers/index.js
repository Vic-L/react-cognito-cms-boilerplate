import { combineReducers } from 'redux'
import { LoadingReducer } from '_reducers/LoadingReducer'

export default combineReducers({
  isLoading: LoadingReducer,
})