export const AlertReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALERT_SHOW':
    return action.alert
    
    case 'LOGIN_FAILURE':
    return {
      title: "Alert",
      body: action.message
    }

    case 'ALERT_DISMISS':
    return null
    default:
    return state
  }
}