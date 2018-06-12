import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import TransitionGroup from 'react-transition-group/TransitionGroup'

import {
  AlertModal,
  LoadingModal,
  PrivateRoute,
  PublicRoute,
  Dashboard,
} from '_miscellaneous'
import { Login } from '_authentications'

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
            component={Dashboard})
  ~)
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

export default withRouter(connect(mapStateToProps)(App))