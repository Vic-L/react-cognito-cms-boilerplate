import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import TransitionGroupWrapper from '_transitions/TransitionGroupWrapper'
import AlertModal from '_miscellaneous/AlertModal'
import Main from '_miscellaneous/Main'
import Login from '_authentications/Login'

const App = ({ dispatch, location }) => {
  const transitionComponentKey = location.pathname === 'login' ? 'login' : 'main'

  return (
    <div>
      <AlertModal/>
      <TransitionGroupWrapper>
        <TransitionGroup>
          <CSSTransition
            key={transitionComponentKey}
            timeout={Number(TRANSITION_TIMEOUT)}
            classNames='fade'
            appear>
            <Switch location={location}>
              <Route
                path="/login"
                exact={true}
                component={Login}/>
              <Route
                path="/"
                dispatch={dispatch}
                component={Main}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </TransitionGroupWrapper>
    </div>
  )
}

export default withRouter(App)