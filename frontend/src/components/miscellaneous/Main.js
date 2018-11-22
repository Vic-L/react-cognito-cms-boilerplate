import _ from 'lodash'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import TransitionGroup from 'react-transition-group/TransitionGroup'

import requireAuth from '_hocs/requireAuth'

import AnimationWrapper from '_animationWrappers/AnimationWrapper'
import Sidebar from '_sidebar/Sidebar'
import Dashboard from '_miscellaneous/Dashboard'
import Form from '_inputs/Form'
import Cards from '_cards/Cards'
import Charts from '_charts/Charts'

import TableScreen from '_screens/TableScreen'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      in: true,
    }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    return(
      <AnimationWrapper
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (
            <div className='grid-container full'>
              <div className='grid-x'>
                <Sidebar dispatch={this.props.dispatch} history={this.props.history}/>
                <div className='main cell medium-12'>
                  <div className='grid-container'>
                    <div className='grid-x'>
                      <div className='cell medium-12'>
                        <TransitionGroup>
                          <Switch>
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
                        </TransitionGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}/>
    )
  }
}

export default requireAuth(Main)
