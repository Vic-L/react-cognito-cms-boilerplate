import _ from 'lodash'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Auth from '@aws-amplify/auth'

import requireAuth from '_hocs/requireAuth'

const Sidebar = Loadable({
  loader: () => import('_sidebar/Sidebar'),
  loading: () => <div></div>,
})
const Dashboard = Loadable({
  loader: () => import('_miscellaneous/Dashboard'),
  loading: () => <div></div>,
})
const Form = Loadable({
  loader: () => import('_inputs/Form'),
  loading: () => <div></div>,
})
const Table = Loadable({
  loader: () => import('_tables/Table'),
  loading: () => <div></div>,
})
const Cards = Loadable({
  loader: () => import('_cards/Cards'),
  loading: () => <div></div>,
})

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
