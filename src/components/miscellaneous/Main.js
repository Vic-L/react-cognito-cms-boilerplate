import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const Sidebar = Loadable({
  loader: () => import('_sidebar/Sidebar'),
  loading: () => <div></div>,
})

const Dashboard = Loadable({
  loader: () => import('_miscellaneous/Dashboard'),
  loading: () => <div></div>,
})

const PrivateRoute = Loadable({
  loader: () => import('_miscellaneous/PrivateRoute'),
  loading: () => <div></div>,
})

class Main extends React.Component {
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

export default Main
