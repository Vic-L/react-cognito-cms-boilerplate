import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const Sidebar = Loadable({
  loader: () => import('_sidebar/Sidebar'),
  loading: () => <div></div>,
})

const Dashboard = Loadable({
  loader: () => import('_miscellaneous/Dashboard'),
  loading: () => <div></div>,
})

const PrivateRoute = Loadable({
  loader: () => import('_miscellaneous/PrivateRoute'),
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
                    <PrivateRoute
                      path="/"
                      exact={true}
                      component={Dashboard}/>
                    <PrivateRoute
                      path="/form"
                      exact={true}
                      component={Form}/>
                    <PrivateRoute
                      path="/table"
                      exact={true}
                      component={Table}/>
                    <PrivateRoute
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

export default Main
