import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(`CognitoIdentityServiceProvider.${process.env.COGNITO_ADMIN_CLIENT_ID}.LastAuthUser`) ? (
        <Redirect to="/"/>
      ) : (
        <Component {...props} />
      )
    }
  />
)

export { PublicRoute }
