import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { logoutAdminUser } from '_actions/authentications'

import { Button } from '_buttons'
import { Sidebar } from '_sidebar'
import {
  Dashboard,
  PrivateRoute
} from '_miscellaneous'

class _Main extends React.Component {
  render() {
    return (~
      .grid-container.full
        .grid-x
          .sidebar.cell.medium-2
            %Button(
              text="Logout"
              className="button"
              onClick={() => {
                this.props.logoutAdminUser()
              }})
            %Sidebar
          .main.cell.medium-10
            %Switch
              %PrivateRoute(
                path="/"
                exact=""
                component={Dashboard})
    ~)
  }
}

const Main = connect(null, { logoutAdminUser })(_Main)

export { Main }