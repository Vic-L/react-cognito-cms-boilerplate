import _ from 'lodash'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { Box } from '@rebass/grid'

import requireAuth from '_hocs/requireAuth'

import TransitionGroupWrapper from '_transitions/TransitionGroupWrapper'
import TransitionWrapper from '_transitions/TransitionWrapper'
import Sidebar from '_sidebar/Sidebar'
import Dashboard from '_miscellaneous/Dashboard'
import Form from '_inputs/Form'
import Cards from '_cards/Cards'
import Charts from '_charts/Charts'

import TableScreen from '_screens/TableScreen'

const Main = ({
  location,
  dispatch,
  history
}) => {
  const transitionComponentKey = location.pathname.split('/')[1] || '/'

  return(
    <React.Fragment>
      <Sidebar dispatch={dispatch} history={history}/>
      <Box
        width={1}
        px='3rem'>
        <TransitionGroupWrapper>
          <TransitionGroup>
            <CSSTransition
              key={transitionComponentKey}
              timeout={Number(TRANSITION_TIMEOUT)}
              classNames="fade"
              appear>

              <Switch location={location}>
                <Route
                  path="/"
                  exact={true}
                  component={Dashboard}/>
                <Route
                  path="/form"
                  exact={true}
                  component={Form}/>
                <Route
                  path="/table"
                  exact={true}
                  component={TableScreen}/>
                <Route
                  path="/cards"
                  exact={true}
                  component={Cards}/>
                <Route
                  path="/charts"
                  exact={true}
                  component={Charts}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </TransitionGroupWrapper>
      </Box>
    </React.Fragment>
  )
}

export default requireAuth(TransitionWrapper(Main))