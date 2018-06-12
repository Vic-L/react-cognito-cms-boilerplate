import React from 'react'
import { Switch, Route } from 'react-router-dom'

import TransitionGroup from 'react-transition-group/TransitionGroup'

import Home from '_components/Home'
import { Login } from '_authentications'

const App = () => {
  return (~  
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

export default App