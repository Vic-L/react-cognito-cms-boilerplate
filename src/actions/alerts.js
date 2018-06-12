import * as actionTypes from "_actions/types"

export function dismissAlert() {
  return function(dispatch) {
    dispatch({
      type: actionTypes.ALERT_DISMISS
    })
  }
}