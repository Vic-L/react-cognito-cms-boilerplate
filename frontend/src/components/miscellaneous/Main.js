import _ from 'lodash'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import requireAuth from '_hocs/requireAuth'

import TransitionGroupWrapper from '_animations/TransitionGroupWrapper'
import TransitionWrapper from '_animations/TransitionWrapper'
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
    <div className='grid-container full'>
      <div className='grid-x'>
        <Sidebar dispatch={dispatch} history={history}/>
        <div className='main cell medium-12'>
          <div className='grid-container'>
            <div className='grid-x'>
              <div className='cell medium-12'>
                <TransitionGroupWrapper>
                  <TransitionGroup>
                    <CSSTransition
                      key={transitionComponentKey}
                      timeout={500}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default requireAuth(TransitionWrapper(Main))