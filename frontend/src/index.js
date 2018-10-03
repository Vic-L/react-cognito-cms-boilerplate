import '_stylesheets/main.sass'

import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { compose, createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from  'react-redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'

// authentication
import Auth from '@aws-amplify/auth'

Auth.configure({
  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  
  // REQUIRED - Amazon Cognito Region
  region: process.env.COGNITO_REGION,

  // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
  // Required only if it's different from Amazon Cognito Region
  // identityPoolRegion: 'XX-XXXX-X',

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.COGNITO_ADMIN_USER_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.COGNITO_ADMIN_CLIENT_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false,

  // // OPTIONAL - Configuration for cookie storage
  // cookieStorage: {
  // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
  //     domain: '.yourdomain.com',
  // // OPTIONAL - Cookie path
  //     path: '/',
  // // OPTIONAL - Cookie expiration in days
  //     expires: 1,
  // // OPTIONAL - Cookie secure flag
  //     secure: true
  // },

  // OPTIONAL - customized storage object
  // storage: new MyStorage(),
  
  // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  // authenticationFlowType: 'USER_PASSWORD_AUTH'
})

// apollo
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createNetworkStatusNotifier } from 'react-apollo-network-status'

// for listening to `loading` value in each graphql query/mutation on global level
const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink
} = createNetworkStatusNotifier()

const apolloClient = new ApolloClient({
  link: networkStatusNotifierLink.concat(new HttpLink({ uri: 'https://fakerql.com/graphql' })),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
})

// redux related
import rootReducers from '_reducers'

import App from '_components/App'
import Loader from '_components/Loader'

import WebFont from 'webfontloader'

import axios from 'axios'

axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common["Accept"] = "application/json"

import sagas from './sagas'

const middlewares = [];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

const history = createHistory()
middlewares.push(routerMiddleware(history))
 
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducers)

sagaMiddleware.run(sagas)

WebFont.load({
  google: {
    families: ['Lato']
  }
})

render((
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <NetworkStatusNotifier render={({loading, error}) => (
            <Loader loading={loading} error={error}/>
          )}/>
          <App />
        </div>
      </Router>
    </Provider>
  </ApolloProvider>
), document.getElementById("app"))
