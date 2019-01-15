import '_stylesheets/main.sass'

import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { render } from 'react-dom'
import { Router, BrowserRouter } from 'react-router-dom'

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

//// if required for APIs unsupported by GraphQL
// import axios from 'axios'
// axios.defaults.headers.common["Content-Type"] = "application/json"
// axios.defaults.headers.common["Accept"] = "application/json"

const history = createHistory()

import App from '_components/App'

import WebFont from 'webfontloader'
WebFont.load({
  google: {
    families: ['Lato', 'Montserrat']
  }
})

// if using App Sync
/*

** NOTE: add `cp ./src/configs/<env>/appsync.js ./src/appsync.js &&` to start of scripts in package.json to load the correct env for appsync

import AWSAppSyncClient from "aws-appsync"
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'

import appSyncConfig from './appsync'

console.log("appSyncConfig", appSyncConfig)

const appSyncClient = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  disableOffline: true,
  cacheOptions: {
    dataIdFromObject: o => {o.id ? `${o.__typename}-${o.id}`: `${o.__typename}-${o.cursor}`},
  }
});

render((
  <ApolloProvider client={appSyncClient}>
    <Provider store={store}>
      <Rehydrated>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Rehydrated>
    </Provider>
  </ApolloProvider>
), document.getElementById("app"))

*/

// if using apollo
import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
  uri: 'https://fakerql.com/graphql',
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

import { Normalize } from 'styled-normalize'

const AppProvider = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <React.Fragment>
          <Normalize/>
          <App />
        </React.Fragment>
      </Router>
    </ApolloProvider>
  )
}

export default AppProvider
