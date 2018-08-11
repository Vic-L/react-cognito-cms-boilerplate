export const AlertReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALERT_SHOW':
    return action.alert
    case 'ALERT_DISMISS':
    return null
    default:
    return state
  }
}