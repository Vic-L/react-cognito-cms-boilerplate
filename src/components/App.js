import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

import {
  LoadingModal,
} from '_miscellaneous'

const TransitionGroup = Loadable({
  loader: () => import('react-transition-group/TransitionGroup'),
  loading: LoadingModal,
})

const AlertModal = Loadable({
  loader: () => import('_miscellaneous'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.AlertModal
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
const PublicRoute = Loadable({
  loader: () => import('_miscellaneous'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.PublicRoute
    return <Component {...props}/>
  }
})
const Main = Loadable({
  loader: () => import('_miscellaneous'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.Main
    return <Component {...props}/>
  }
})
const Login = Loadable({
  loader: () => import('_authentications'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.Login
    return <Component {...props}/>
  }
})

const App = ({ isLoading }) => {
  return (~
    %div
      %AlertModal
      {
        isLoading ? (~
          %LoadingModal
        ~) : null
      }
      %TransitionGroup
        %Switch
          %PublicRoute(
            path="/login"
            exact=""
            component={Login})
          %PrivateRoute(
            path="/"
            exact=""
            component={Main})
  ~)
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

export default withRouter(connect(mapStateToProps)(App))