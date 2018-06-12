import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import TransitionGroup from 'react-transition-group/TransitionGroup'

import {
  Home,
  AlertModal,
  LoadingModal,
  PrivateRoute,
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
          %Route(
            path="/login"
            exact=""
            component={Login})
          %PrivateRoute(
            path="/"
            exact=""
            component={Home})
  ~)
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

export default connect(mapStateToProps)(App)