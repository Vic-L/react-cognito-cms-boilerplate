import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'

import {
  LoadingModal,
} from '_miscellaneous'

const Sidebar = Loadable({
  loader: () => import('_sidebar'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.Sidebar
    return <Component {...props}/>
  }
})

const Dashboard = Loadable({
  loader: () => import('_miscellaneous'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.Dashboard
    return <Component {...props}/>
  }
})

const PrivateRoute = Loadable({
  loader: () => import('_miscellaneous'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.PrivateRoute
    return <Component {...props}/>
  }
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

export { Main }