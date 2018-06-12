import * as actionTypes from "_actions/types"

export const AlertReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ALERT_SHOW:
    return action.alert
    case actionTypes.ALERT_DISMISS:
    return null
    default:
    return state
  }
}