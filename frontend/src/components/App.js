import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import TransitionGroup from 'react-transition-group/TransitionGroup'
import AlertModal from '_miscellaneous/AlertModal'
import Main from '_miscellaneous/Main'
import Login from '_authentications/Login'

const App = ({ dispatch }) => {
  return (
    <div>
      <AlertModal/>
      <TransitionGroup>
        <Switch>
          <Route
            path="/login"
            exact={true}
            component={Login}/>
          <Route
            path="/"
            dispatch={dispatch}
            component={Main}/>
        </Switch>
      </TransitionGroup>
    </div>
  )
}

export default withRouter(App)