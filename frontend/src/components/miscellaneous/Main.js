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

class Main extends React.Component {
  render() {
    return (
      <div className='grid-container full'>
        <div className='grid-x'>
          <Sidebar dispatch={this.props.dispatch}/>
          <div className='main cell medium-12'>
            <Switch>
              <PrivateRoute
                path="/"
                exact={true}
                component={Dashboard}/>
              <PrivateRoute
                path="/form"
                exact={true}
                component={Form}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
