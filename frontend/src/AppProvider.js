import '_stylesheets/main.sass';

import React from 'react';
import { Router } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import createHistory from 'history/createBrowserHistory';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import App from '_components/App';

// if using apollo
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import defaults from '_apollo/defaults';
import resolvers from '_apollo/resolvers';
import typeDefs from '_apollo/typeDefs';

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
});

//// if required for APIs unsupported by GraphQL
// import axios from 'axios'
// axios.defaults.headers.common["Content-Type"] = "application/json"
// axios.defaults.headers.common["Accept"] = "application/json"

const history = createHistory();

if (typeof window !== 'undefined') {
  const WebFont = require('webfontloader');

  WebFont.load({
    google: {
      families: ['Lato', 'Montserrat']
    }
  });
}

// if using App Sync
/*

** NOTE: add `cp ./src/configs/<env>/appsync.js ./src/appsync.js &&`
** to start of scripts in package.json to load the correct env for appsync

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

const apolloClient = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh/graphql',
  cache: new InMemoryCache(),
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
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
});

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }
`;

const AppProvider = () => (
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <React.Fragment>
        <GlobalStyle />
        <App />
      </React.Fragment>
    </Router>
  </ApolloProvider>
);

export default AppProvider;
