import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

const TransitionGroup = Loadable({
  loader: () => import('react-transition-group/TransitionGroup'),
  loading: () => <div></div>,
})

const AlertModal = Loadable({
  loader: () => import('_miscellaneous/AlertModal'),
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