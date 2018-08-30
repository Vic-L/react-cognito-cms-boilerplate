import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import GetAdminJwt from '_services/GetAdminJwt'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      GetAdminJwt().next().value ? (
        <Redirect to="/"/>
      ) : (
        <Component {...rest} {...props} />
      )
    }
  />
)

export default PublicRoute
