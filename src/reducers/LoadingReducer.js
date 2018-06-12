import * as actionTypes from "_actions/types"

export const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
    return true
    case actionTypes.LOADING_END:
    return false
    default:
    return state
  }
}