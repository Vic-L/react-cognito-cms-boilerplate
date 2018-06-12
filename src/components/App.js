import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import TransitionGroup from 'react-transition-group/TransitionGroup'

import Home from '_components/Home'
import AlertModal from '_components/AlertModal'
import LoadingModal from '_components/LoadingModal'
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
          %Route(
            path="/"
            exact=""
            component={Home})
  ~)
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

export default connect(mapStateToProps)(App)