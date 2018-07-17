import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

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
            %Sidebar(dispatch={this.props.dispatch})
          .main.cell.medium-10
            %Switch
              %PrivateRoute(
                path="/"
                exact=""
                component={Dashboard})
    ~)
  }
}

const Main = connect(null)(_Main)

export { Main }