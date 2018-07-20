import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

import LoadingModal from '_miscellaneous/LoadingModal'

const TransitionGroup = Loadable({
  loader: () => import('react-transition-group/TransitionGroup'),
  loading: () => <div></div>,
})

const AlertModal = Loadable({
  loader: () => import('_miscellaneous/AlertModal'),
  loading: () => <div></div>,
})
const PrivateRoute = Loadable({
  loader: () => import('_miscellaneous/PrivateRoute'),
  loading: () => <div></div>,
})
const PublicRoute = Loadable({
  loader: () => import('_miscellaneous/PublicRoute'),
  loading: () => <div></div>,
})
const Main = Loadable({
  loader: () => import('_miscellaneous/Main'),
  loading: () => <div></div>,
})
const Login = Loadable({
  loader: () => import('_authentications/Login'),
  loading: () => <div></div>,
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
            dispatch={this.props.dispatch}
            component={Main})
  ~)
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

export default withRouter(connect(mapStateToProps)(App))