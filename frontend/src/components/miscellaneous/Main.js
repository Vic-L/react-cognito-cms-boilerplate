import _ from 'lodash'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '@aws-amplify/auth'

import requireAuth from '_hocs/requireAuth'

import Sidebar from '_sidebar/Sidebar'
import Dashboard from '_miscellaneous/Dashboard'
import Form from '_inputs/Form'
import Table from '_tables/Table'
import Cards from '_cards/Cards'
import Charts from '_charts/Charts'

class Main extends React.Component {
  render() {
    return (
      <div className='grid-container full'>
        <div className='grid-x'>
          <Sidebar dispatch={this.props.dispatch} history={this.props.history}/>
          <div className='main cell medium-12'>
            <div className='grid-container'>
              <div className='grid-x'>
                <div className='cell medium-12'>
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
                      component={Table}/>
                    <Route
                      path="/cards"
                      exact={true}
                      component={Cards}/>
                    <Route
                      path="/charts"
                      exact={true}
                      component={Charts}/>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default requireAuth(Main)
