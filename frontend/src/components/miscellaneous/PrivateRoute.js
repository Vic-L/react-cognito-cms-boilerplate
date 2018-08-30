import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import GetAdminJwt from '_services/GetAdminJwt'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      GetAdminJwt().next().value ? (
        <Component {...rest} {...props}/>
      ) : (
        <Redirect to="/login"/>
      )
    }
  />
)

export default PrivateRoute
