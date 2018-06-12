import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(`CognitoIdentityServiceProvider.${process.env.COGNITO_ADMIN_CLIENT_ID}.LastAuthUser`) ? (
        <Component {...props} />
      ) : (
        <Redirect from="/" to="/login"/>
      )
    }
  />
)

export { PrivateRoute }
