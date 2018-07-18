import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'

import LoadingModal from '_miscellaneous/LoadingModal'

const Sidebar = Loadable({
  loader: () => import('_sidebar/Sidebar'),
  loading: LoadingModal,
})

const Dashboard = Loadable({
  loader: () => import('_miscellaneous/Dashboard'),
  loading: LoadingModal,
})

const PrivateRoute = Loadable({
  loader: () => import('_miscellaneous/PrivateRoute'),
  loading: LoadingModal,
})

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

export default Main
